// src/controllers/ExpenseController.ts
import { GetAllTransaction } from '../use-cases/GetAllTransaction';
import { CreateExtenseAndIncomeDTO } from '../dto/CreateExtenseAndIncomeDTO';
import HttpServer from '../HttpServer/HttpServer';
import { Request, Response } from 'express';
import { CreateCardDTO } from '../dto/CreateCardDTO';
import { CreateCard } from '../use-cases/CreateCard';
import { CreateExpenseAndIncome } from '../use-cases/CreateExpenseAndIncome';
import { GetIDTransaction } from '../use-cases/GetIDTransaction';
import { GetYearAndMonthTransaction } from '../use-cases/GetYearAndMonth';
import { YearAndMonthDTO } from '../dto/YearAndMonthDTO';

export class TransactionController {

    constructor(
      readonly httpServer: HttpServer,
      readonly createCardUseCase: CreateCard,
      readonly createExpenseAndIncomeUseCase: CreateExpenseAndIncome,
      readonly getAllTransactionUseCase: GetAllTransaction,
      readonly getIDTransactionUseCase: GetIDTransaction,
      readonly getYearAndMonthUseCase: GetYearAndMonthTransaction
    ) {
      this.httpServer.register("post", "/transaction/expense", this.createExpenseAndIncome.bind(this));
      this.httpServer.register("post", "/transaction/income", this.createExpenseAndIncome.bind(this));
      this.httpServer.register("post", "/transaction/card", this.createCard.bind(this));
      this.httpServer.register("get", "/transaction/:id", this.getID.bind(this));
      this.httpServer.register("get", "/transaction/year/:year/month/:month", this.getYearAndMonth.bind(this));
      this.httpServer.register("get", "/transaction/year/:year", this.getYearAndMonth.bind(this));
      this.httpServer.register("get", "/transaction", this.getAll.bind(this));
    }

    async createCard(req: Request, res: Response): Promise<void> {
        const data: CreateCardDTO = req.body;
        try {
            const card = await this.createCardUseCase.execute(data);
            res.status(201).json(card);
        } catch (e: any) {
            res.status(500).json({ error: 'Error creating transaction', message: `${e.message}`});
        }
    }

    async createExpenseAndIncome(req: Request, res: Response): Promise<void> {
        const data: CreateExtenseAndIncomeDTO = req.body;
        try {
            const transaction = await this.createExpenseAndIncomeUseCase.execute(data);
            res.status(201).json(transaction);
        } catch (e: any) {
            res.status(500).json({ error: 'Error creating transaction', message: `${e.message}`});
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const transactions = await this.getAllTransactionUseCase.execute();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: 'Error getting transaction' });
        }
    }

    async getID(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const transaction = await this.getIDTransactionUseCase.execute(id);
            res.status(200).json(transaction);
        } catch (e: any) {
            res.status(500).json({ error: 'Error getting transaction id' });
        }
    }

    async getYearAndMonth(req: Request, res: Response): Promise<void> {
        const { year, month} = req.params;
        try {
            const data: YearAndMonthDTO = { 
                year: Number(year), 
                month: (month ? Number(month) : undefined)
            };
            const transactions = await this.getYearAndMonthUseCase.execute(data);
            res.status(200).json(transactions);
        } catch (e: any) {
            res.status(500).json({ error: 'Error getting transaction month',  message: `${e.message}` });
        }
    }
}
