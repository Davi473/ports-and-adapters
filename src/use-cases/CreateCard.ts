import TransactionRepository from '../repositories/TransactionRepository';
import { CreateCardDTO } from '../dto/CreateCardDTO';
import { Card } from '../models/Card';
import EmailService from '../services/EmailService';
import UseCase from './useCase';

export class CreateCard implements UseCase {

    constructor(
        private readonly repository: TransactionRepository,
        private readonly service: EmailService
    ) {}

    async execute(data: CreateCardDTO): Promise<Object> {
        const { description, amount, date, type, list } = data;
        const transaction = Card.create(description, amount, date, type, list);
        const response = await this.repository.save(transaction);
        await this.service.sendEmail("davi@gmail.com", "Transaction created");
        return response.getValues();
    }
}
