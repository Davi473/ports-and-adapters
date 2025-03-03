import DatabaseConnection from '../DataBase/DataBaseConnection';
import { Income } from '../models/Income';
import { Transaction } from '../models/Transaction';

export default interface TransactionRepository 
{
    save(transaction: Transaction): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
}

export class MemoryTransactionRepository implements TransactionRepository 
{
    private repository: Transaction[] = [];

    constructor() {}

    async save(transaction: Transaction): Promise<Transaction> {
        this.repository.push(transaction);
        return transaction;
    }

    async findAll(): Promise<Transaction[]> {
        return this.repository;
    }
}

export class PostgresTransactionRepository implements TransactionRepository 
{
    constructor(private readonly connection: DatabaseConnection) {}

    async save(transaction: Transaction): Promise<Transaction> {
        const query = "INSERT INTO expense (id, description, amount, date, income) VALUES ($1, $2, $3, $4, $5)";
        const values = [transaction.getID(), transaction.getDescription(), transaction.getAmount(), 
            transaction.getDate(), transaction.getType()];
        await this.connection.query(query, values);
        return transaction;
    }

    async findAll(): Promise<Transaction[]> {
        const query = "SELECT * FROM expense";
        const result: any[] = await this.connection.query(query);
        return result.map((row) => new Income(row.id, row.description, row.amount, row.date, row.income));
    }
}
