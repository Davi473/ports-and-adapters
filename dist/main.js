"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionRepository_1 = require("./repositories/TransactionRepository");
const HttpServer_1 = require("./HttpServer/HttpServer");
const TransactionController_1 = require("./controllers/TransactionController");
const GetAllTransaction_1 = require("./use-cases/GetAllTransaction");
const EmailService_1 = __importDefault(require("./services/EmailService"));
const DataBaseConnection_1 = require("./DataBase/DataBaseConnection");
const EmailAdapter_1 = require("./repositories/EmailAdapter");
const CreateExpenseAndIncome_1 = require("./use-cases/CreateExpenseAndIncome");
const CreateCard_1 = require("./use-cases/CreateCard");
const GetIDTransaction_1 = require("./use-cases/GetIDTransaction");
const GetYearAndMonth_1 = require("./use-cases/GetYearAndMonth");
const API = new HttpServer_1.ExpressAdapter();
const PORT = 3000;
const emailAdapter = new EmailAdapter_1.EmailTest();
const expenseEmailService = new EmailService_1.default(emailAdapter);
const expenseRepository = new TransactionRepository_1.MemoryTransactionRepository();
const connection = new DataBaseConnection_1.PgPromiseAdapter();
// const expenseRepository: TransactionRepository = new PostgresTransactionRepository(connection);
const transactionCreateExpenseAndIncome = new CreateExpenseAndIncome_1.CreateExpenseAndIncome(expenseRepository, expenseEmailService);
const transactionCreateCard = new CreateCard_1.CreateCard(expenseRepository, expenseEmailService);
const expenseGetAllUseCase = new GetAllTransaction_1.GetAllTransaction(expenseRepository);
const transactionGetYearAndMonth = new GetYearAndMonth_1.GetYearAndMonthTransaction(expenseRepository);
const transactionGetIDUseCase = new GetIDTransaction_1.GetIDTransaction(expenseRepository);
const expenseController = new TransactionController_1.TransactionController(API, transactionCreateCard, transactionCreateExpenseAndIncome, expenseGetAllUseCase, transactionGetIDUseCase, transactionGetYearAndMonth);
API.listen(PORT);
