"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const Transaction_1 = require("./Transaction");
class Card extends Transaction_1.Transaction {
    constructor(id, description, amount, date, type, list) {
        super(id, description, amount, date, type);
        this.list = list;
    }
    static create(description, amount, date, type, list = []) {
        return new Card(crypto.randomUUID(), description, amount, date, type, list);
    }
    getList() {
        return this.list;
    }
    getValues() {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            date: this.getDate(),
            type: this.getType(),
            list: this.getList()
        };
    }
}
exports.Card = Card;
