import DatabaseConnection from '../DataBase/DataBaseConnection';
import { Card } from '../models/Card';
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
        const card = transaction instanceof Card;
        if(card) {
            const query = "INSERT INTO transaction (id, description, amount, date, type, list) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [transaction.getID(), transaction.getDescription(), transaction.getAmount(), 
                transaction.getDate(), transaction.getType(), transaction.getList()];
            await this.connection.query(query, values);
        } else {
            const query = "INSERT INTO transaction (id, description, amount, date, type) VALUES ($1, $2, $3, $4, $5)";
            const values = [transaction.getID(), transaction.getDescription(), transaction.getAmount(), 
                transaction.getDate(), transaction.getType()];
            await this.connection.query(query, values);
        }
        return transaction;
    }

    async findAll(): Promise<Transaction[]> {
        const query = "SELECT * FROM transaction";
        const result: any[] = await this.connection.query(query);
        return result.map((row) => new Income(row.id, row.description, row.amount, row.date, row.income));
    }
}
