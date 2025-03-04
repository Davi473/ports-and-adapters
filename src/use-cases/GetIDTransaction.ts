import TransactionRepository from '../repositories/TransactionRepository';
import UseCase from './useCase';

export class GetIDTransaction implements UseCase {

  constructor(private readonly repository: TransactionRepository) {}

    async execute(id: string): Promise<Object> {
        const response = await this.repository.findID(id);
        return response.getValues();
    }
}
