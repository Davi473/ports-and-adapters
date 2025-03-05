"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Description {
    constructor(name) {
        if (!(name.length < 32))
            throw new Error("Invalid name");
        this.value = name;
    }
    getValue() {
        return this.value;
    }
}
exports.default = Description;
