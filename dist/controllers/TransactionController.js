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
exports.TransactionController = void 0;
class TransactionController {
    constructor(httpServer, createCardUseCase, createExpenseAndIncomeUseCase, getAllTransactionUseCase, getIDTransactionUseCase, getYearAndMonthUseCase) {
        this.httpServer = httpServer;
        this.createCardUseCase = createCardUseCase;
        this.createExpenseAndIncomeUseCase = createExpenseAndIncomeUseCase;
        this.getAllTransactionUseCase = getAllTransactionUseCase;
        this.getIDTransactionUseCase = getIDTransactionUseCase;
        this.getYearAndMonthUseCase = getYearAndMonthUseCase;
        this.httpServer.register("post", "/transaction/expense", this.createExpenseAndIncome.bind(this));
        this.httpServer.register("post", "/transaction/income", this.createExpenseAndIncome.bind(this));
        this.httpServer.register("post", "/transaction/card", this.createCard.bind(this));
        this.httpServer.register("get", "/transaction/:id", this.getID.bind(this));
        this.httpServer.register("get", "/transaction/year/:year/month/:month", this.getYearAndMonth.bind(this));
        this.httpServer.register("get", "/transaction/year/:year", this.getYearAndMonth.bind(this));
        this.httpServer.register("get", "/transaction", this.getAll.bind(this));
    }
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const card = yield this.createCardUseCase.execute(data);
                res.status(201).json(card);
            }
            catch (e) {
                res.status(500).json({ error: 'Error creating transaction', message: `${e.message}` });
            }
        });
    }
    createExpenseAndIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const transaction = yield this.createExpenseAndIncomeUseCase.execute(data);
                res.status(201).json(transaction);
            }
            catch (e) {
                res.status(500).json({ error: 'Error creating transaction', message: `${e.message}` });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield this.getAllTransactionUseCase.execute();
                res.status(200).json(transactions);
            }
            catch (error) {
                res.status(500).json({ error: 'Error getting transaction' });
            }
        });
    }
    getID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const transaction = yield this.getIDTransactionUseCase.execute(id);
                res.status(200).json(transaction);
            }
            catch (e) {
                res.status(500).json({ error: 'Error getting transaction id' });
            }
        });
    }
    getYearAndMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, month } = req.params;
            try {
                const data = {
                    year: Number(year),
                    month: (month ? Number(month) : undefined)
                };
                const transactions = yield this.getYearAndMonthUseCase.execute(data);
                res.status(200).json(transactions);
            }
            catch (e) {
                res.status(500).json({ error: 'Error getting transaction month', message: `${e.message}` });
            }
        });
    }
}
exports.TransactionController = TransactionController;
