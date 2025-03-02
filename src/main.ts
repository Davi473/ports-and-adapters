import TransactionRepository, { MemoryTransactionRepository, PostgresTransactionRepository } from './repositories/TransactionRepository';
import HttpServe, { ExpressAdapter } from './HttpServer/HttpServer';
import { TransactionController } from './controllers/TransactionController';
import { CreateTransaction } from './use-cases/CreateTransaction';
import { GetAllTransaction } from './use-cases/GetAllTransaction';
import EmailService from './services/EmailService';
import DatabaseConnection, { PgPromiseAdapter } from './DataBase/DataBaseConnection';
import EmailAdapter, { EmailTest } from './repositories/EmailAdapter';

const API: HttpServe = new ExpressAdapter();
const PORT: number = 3000;

const emailAdapter: EmailAdapter = new EmailTest();
const expenseEmailService: EmailService = new EmailService(emailAdapter);
// const expenseRepository: ExpenseRepository = new MemoryExpenseRepository();
const connection: DatabaseConnection = new PgPromiseAdapter();
const expenseRepository: TransactionRepository = new PostgresTransactionRepository(connection);
const expenseCreateUseCase: CreateTransaction = new CreateTransaction(expenseRepository, expenseEmailService);
const expenseGetAllUseCase: GetAllTransaction = new GetAllTransaction(expenseRepository);
const expenseController: TransactionController = new TransactionController(API, 
    expenseCreateUseCase, expenseGetAllUseCase);

API.listen(PORT);