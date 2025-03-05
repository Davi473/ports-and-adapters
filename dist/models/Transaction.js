"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Amount_1 = __importDefault(require("./Amount"));
const Description_1 = __importDefault(require("./Description"));
const Type_1 = __importDefault(require("./Type"));
class Transaction {
    constructor(id, description, amount, date, type) {
        this.id = id;
        this.description = new Description_1.default(description);
        this.amount = new Amount_1.default(amount);
        this.date = new Date(date);
        this.type = new Type_1.default(type);
    }
    static create(description, amount, date, type) {
        return new Transaction(crypto_1.default.randomUUID(), description, amount, date, type);
    }
    getID() {
        return this.id;
    }
    getDescription() {
        return this.description.getValue();
    }
    getAmount() {
        return this.amount.getValue();
    }
    getDate() {
        return this.date;
    }
    getType() {
        return this.type.getValue();
    }
    getValues() {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            date: this.getDate(),
            type: this.getType()
        };
    }
}
exports.Transaction = Transaction;
