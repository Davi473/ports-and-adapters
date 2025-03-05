"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Income = void 0;
const Transaction_1 = require("./Transaction");
class Income extends Transaction_1.Transaction {
    constructor(id, description, amount, date, type) {
        super(id, description, amount, date, type);
    }
    static create(description, amount, date, type) {
        return new Income(crypto.randomUUID(), description, amount, date, type);
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
exports.Income = Income;
