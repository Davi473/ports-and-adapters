import TransactionRepository from '../repositories/TransactionRepository';
import UseCase from './useCase';

export class GetAllTransaction implements UseCase {

  constructor(private readonly repository: TransactionRepository) {}

    async execute(): Promise<Object[]> {
        const response = await this.repository.findAll();
        return response.map(transaction => transaction.getValues());
    }
}
