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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgPromiseAdapter = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
class PgPromiseAdapter {
    constructor() {
        this.connection = (0, pg_promise_1.default)()("postgres://postgres:123@localhost:5432/expense");
    }
    query(statement, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const output = yield this.connection.query(statement, params);
            return output;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.connection.$pool.end();
        });
    }
}
exports.PgPromiseAdapter = PgPromiseAdapter;
