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
exports.CreateExpenseAndIncome = void 0;
const Transaction_1 = require("../models/Transaction");
class CreateExpenseAndIncome {
    constructor(repository, service) {
        this.repository = repository;
        this.service = service;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, amount, date, type } = data;
            const transaction = Transaction_1.Transaction.create(description, amount, date, type);
            const response = yield this.repository.save(transaction);
            yield this.service.sendEmail("davi@gmail.com", "Transaction created");
            return response.getValues();
        });
    }
}
exports.CreateExpenseAndIncome = CreateExpenseAndIncome;
