import { Transaction } from "./Transaction";

export class Income extends Transaction {
  
    constructor(
        id: string, description: string, amount: number, 
        date: Date, income: boolean
    ) {
        super(id, description, amount, date, income)
    }

    public static create(
        description: string, amount: number, 
        date: Date, income: boolean
    ): Income {
        return new Income(crypto.randomUUID(), description, 
            amount, date, income);
    }

    public getValues(): Object
    {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            date: this.getDate()
        };
    }
}