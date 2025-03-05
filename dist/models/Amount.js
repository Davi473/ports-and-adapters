"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Amount {
    constructor(name) {
        if (!name)
            throw new Error("Invalid name");
        this.value = name;
    }
    getValue() {
        return this.value;
    }
}
exports.default = Amount;
