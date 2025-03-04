import TransactionRepository, { MemoryTransactionRepository, PostgresTransactionRepository } from './repositories/TransactionRepository';
import HttpServe, { ExpressAdapter } from './HttpServer/HttpServer';
import { TransactionController } from './controllers/TransactionController';
import { GetAllTransaction } from './use-cases/GetAllTransaction';
import EmailService from './services/EmailService';
import DatabaseConnection, { PgPromiseAdapter } from './DataBase/DataBaseConnection';
import EmailAdapter, { EmailTest } from './repositories/EmailAdapter';
import UseCase from './use-cases/useCase';
import { CreateExpenseAndIncome } from './use-cases/CreateExpenseAndIncome';
import { CreateCard } from './use-cases/CreateCard';
import { GetIDTransaction } from './use-cases/GetIDTransaction';
import { GetYearAndMonthTransaction } from './use-cases/GetYearAndMonth';

const API: HttpServe = new ExpressAdapter();
const PORT: number = 3000;

const emailAdapter: EmailAdapter = new EmailTest();
const expenseEmailService: EmailService = new EmailService(emailAdapter);
const expenseRepository: TransactionRepository = new MemoryTransactionRepository();
const connection: DatabaseConnection = new PgPromiseAdapter();
// const expenseRepository: TransactionRepository = new PostgresTransactionRepository(connection);
const transactionCreateExpenseAndIncome: CreateExpenseAndIncome = new CreateExpenseAndIncome(expenseRepository, expenseEmailService);
const transactionCreateCard: CreateCard = new CreateCard(expenseRepository, expenseEmailService);
const expenseGetAllUseCase: GetAllTransaction = new GetAllTransaction(expenseRepository);
const transactionGetYearAndMonth: GetYearAndMonthTransaction = new GetYearAndMonthTransaction(expenseRepository)
const transactionGetIDUseCase: GetIDTransaction = new GetIDTransaction(expenseRepository);
const expenseController: TransactionController = new TransactionController(API, 
    transactionCreateCard, transactionCreateExpenseAndIncome, 
    expenseGetAllUseCase, transactionGetIDUseCase, transactionGetYearAndMonth);

API.listen(PORT);