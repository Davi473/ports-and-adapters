import TransactionRepository from '../repositories/TransactionRepository';
import { CreateTransactionDTO } from '../dto/CreateTransactionDTO';
import { Transaction } from '../models/Transaction';
import EmailService from '../services/EmailService';
import UseCase from './useCase';

export class CreateTransaction implements UseCase {

    constructor(
        private readonly repository: TransactionRepository,
        private readonly service: EmailService
    ) {}

    async execute(data: CreateTransactionDTO): Promise<Object> {
        const { description, amount, date, income } = data;
        const transaction = Transaction.create(description, amount, date, income);
        const response = await this.repository.save(transaction);
        await this.service.sendEmail("davi@gmail.com", "Transaction created");
        return response.getValues();
    }
}
