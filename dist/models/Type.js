"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Type {
    constructor(type) {
        const types = ["income", "expense", "card"];
        if (!types.includes(type))
            throw new Error("Invalid enter");
        this.value = type;
    }
    getValue() {
        return this.value;
    }
}
exports.default = Type;
