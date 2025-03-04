import { CreateTransactionDTO } from "./CreateTransactionDTO";

export interface CreateExtenseAndIncomeDTO extends CreateTransactionDTO {
    description: string;
    amount: number;
    date: Date;
    type: string;
}
  