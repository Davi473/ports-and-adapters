import { CreateTransactionDTO } from "./CreateTransactionDTO";

export interface CreateCardDTO extends CreateTransactionDTO {
    description: string;
    amount: number;
    date: Date;
    type: string;
    list: []
}
  