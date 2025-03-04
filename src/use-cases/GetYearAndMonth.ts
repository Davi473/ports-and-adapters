import { YearAndMonthDTO } from '../dto/YearAndMonthDTO';
import TransactionRepository from '../repositories/TransactionRepository';
import UseCase from './useCase';

export class GetYearAndMonthTransaction implements UseCase {

  constructor(private readonly repository: TransactionRepository) {}

    async execute(date: YearAndMonthDTO): Promise<Object> {
        const { year, month } = date;
        const response = await this.repository.findYearAndMonth(year, (month ? month : undefined));
        return response.map(transaction => transaction.getValues());
    }
}
