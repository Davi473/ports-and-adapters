import { CreateExtenseAndIncomeDTO } from '../dto/CreateExtenseAndIncomeDTO';
import TransactionRepository from '../repositories/TransactionRepository';
import { Transaction } from '../models/Transaction';
import EmailService from '../services/EmailService';
import UseCase from './useCase';

export class CreateExpenseAndIncome implements UseCase {

    constructor(
        private readonly repository: TransactionRepository,
        private readonly service: EmailService
    ) {}

    async execute(data: CreateExtenseAndIncomeDTO): Promise<Object> {
        const { description, amount, date, type } = data;
        const transaction = Transaction.create(description, amount, date, type);
        const response = await this.repository.save(transaction);
        await this.service.sendEmail("davi@gmail.com", "Transaction created");
        return response.getValues();
    }
}
