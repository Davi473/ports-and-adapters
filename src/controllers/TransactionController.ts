// src/controllers/ExpenseController.ts
import { CreateTransaction } from '../use-cases/CreateTransaction';
import { GetAllTransaction } from '../use-cases/GetAllTransaction';
import { CreateTransactionDTO } from '../dto/CreateTransactionDTO';
import HttpServer from '../HttpServer/HttpServer';
import { Request, Response } from 'express';

export class TransactionController {

  constructor(
    readonly httpServer: HttpServer,
    readonly createTransactionUseCase: CreateTransaction,
    readonly getAllTransactionUseCase: GetAllTransaction,
  ) {
    this.httpServer.register("post", "/transaction", this.create.bind(this));
    this.httpServer.register("get", "/transaction", this.getAll.bind(this));
  }

  async create(req: Request, res: Response): Promise<void> {
    const data: CreateTransactionDTO = req.body;
    try {
      const expense = await this.createTransactionUseCase.execute(data);
      res.status(201).json(expense);
    } catch (e: any) {
      console.log(e.message);
      res.status(500).json({ error: 'Error creating expense', message: `${e.message}`});
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const expenses = await this.getAllTransactionUseCase.execute();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Error getting expenses' });
    }
  }
}
