import DatabaseConnection from '../DataBase/DataBaseConnection';
import { Card } from '../models/Card';
import { Expense } from '../models/Expense';
import { Income } from '../models/Income';
import { Transaction } from '../models/Transaction';

export default interface TransactionRepository 
{
    save(transaction: Transaction): Promise<Transaction>;
    findAll(): Promise<Transaction[]>;
    findID(id: string): Promise<Transaction>;
    findYearAndMonth(year: number, month?: number): Promise<Transaction[]>;
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

    async findID(id: string): Promise<Transaction> {
        const index = this.repository.findIndex(transaction => transaction.getID() === id);
        return this.repository[index];
    }

    async findYearAndMonth(year: number, month?: number): Promise<Transaction[]> {

        const transactions = this.repository.filter(transaction => {
            const transactionYear = transaction.getDate().getFullYear();
            const transactionMonth = transaction.getDate().getMonth() + 1;
            return transactionYear === year && (month ? transactionMonth === month : true);
        });
        return transactions
    }
}

export class PostgresTransactionRepository implements TransactionRepository 
{
    constructor(private readonly connection: DatabaseConnection) {}

    async save(transaction: Transaction): Promise<Transaction> {
        const isCard = transaction instanceof Card;
        const fields: any[] = ['id', 'description', 'amount', 'date', 'type'];
        const values: any[] = [
            transaction.getID(),
            transaction.getDescription(),
            transaction.getAmount(),
            transaction.getDate(),
            transaction.getType()
        ];
        if (isCard) {
            fields.push('list');
            values.push(transaction.getList());
        }
        const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
        const query = `INSERT INTO transaction (${fields.join(', ')}) VALUES (${placeholders})`;
        await this.connection.query(query, values);
        return transaction;
    }

    async findAll(): Promise<Transaction[]> {
        const query = "SELECT * FROM transaction";
        const result: any[] = await this.connection.query(query);
        return result.map((row) => row.type === "card" 
            ? new Card(row.id, row.description, row.amount, row.date, row.type, row.list)
            : row.type === "income" 
            ? new Income(row.id, row.description, row.amount, row.date, row.type)
            : new Expense(row.id, row.description, row.amount, row.date, row.type)
        );
    }

    async findID(id: string): Promise<Transaction> {
        const query = "SELECT * FROM transaction WHERE id = $1";
        const values = [id];
        const [result]: any[] = await this.connection.query(query, values);
        return result;
    }

    async findYearAndMonth(year: number, month?: number): Promise<Transaction[]> {
        let query = `SELECT * FROM transaction WHERE EXTRACT(YEAR FROM "date") = $1`;
        const values = [year];
        if(month)
        {
            query += ` AND EXTRACT(MONTH FROM "date") = $2`;
            values.push(month);
        }
        const result: any[] = await this.connection.query(query, values);
        return result;
    }
}
