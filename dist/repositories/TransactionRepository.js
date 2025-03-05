"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresTransactionRepository = exports.MemoryTransactionRepository = void 0;
const Card_1 = require("../models/Card");
const Expense_1 = require("../models/Expense");
const Income_1 = require("../models/Income");
class MemoryTransactionRepository {
    constructor() {
        this.repository = [];
    }
    save(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            this.repository.push(transaction);
            return transaction;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository;
        });
    }
    findID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.repository.findIndex(transaction => transaction.getID() === id);
            return this.repository[index];
        });
    }
    findYearAndMonth(year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = this.repository.filter(transaction => {
                const transactionYear = transaction.getDate().getFullYear();
                const transactionMonth = transaction.getDate().getMonth() + 1;
                return transactionYear === year && (month ? transactionMonth === month : true);
            });
            return transactions;
        });
    }
}
exports.MemoryTransactionRepository = MemoryTransactionRepository;
class PostgresTransactionRepository {
    constructor(connection) {
        this.connection = connection;
    }
    save(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const isCard = transaction instanceof Card_1.Card;
            const fields = ['id', 'description', 'amount', 'date', 'type'];
            const values = [
                transaction.getID(),
                transaction.getDescription(),
                transaction.getAmount(),
                transaction.getDate(),
                transaction.getType()
            ];
            if (isCard) {
                fields.push('list');
                values.push(transaction.getList());
            }
            const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
            const query = `INSERT INTO transaction (${fields.join(', ')}) VALUES (${placeholders})`;
            yield this.connection.query(query, values);
            return transaction;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM transaction";
            const result = yield this.connection.query(query);
            return result.map((row) => row.type === "card"
                ? new Card_1.Card(row.id, row.description, row.amount, row.date, row.type, row.list)
                : row.type === "income"
                    ? new Income_1.Income(row.id, row.description, row.amount, row.date, row.type)
                    : new Expense_1.Expense(row.id, row.description, row.amount, row.date, row.type));
        });
    }
    findID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM transaction WHERE id = $1";
            const values = [id];
            const [result] = yield this.connection.query(query, values);
            return result;
        });
    }
    findYearAndMonth(year, month) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM transaction WHERE EXTRACT(YEAR FROM "date") = $1`;
            const values = [year];
            if (month) {
                query += ` AND EXTRACT(MONTH FROM "date") = $2`;
                values.push(month);
            }
            const result = yield this.connection.query(query, values);
            return result;
        });
    }
}
exports.PostgresTransactionRepository = PostgresTransactionRepository;
