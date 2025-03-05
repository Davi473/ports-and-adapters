import { ListMonth } from '../models/ListMonth';
import TransactionRepository from '../repositories/TransactionRepository';
import UseCase from './useCase';

export class GetMonth implements UseCase {

    constructor(private readonly repository: TransactionRepository) {}

    async execute(): Promise<any[]> {
        const response = await this.repository.findAll();
        const listMonth = new ListMonth(response);
        return listMonth.getListMonth();
    }
}
