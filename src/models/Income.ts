import { Transaction } from "./Transaction";

export class Income extends Transaction {
  
    constructor(
        id: string, description: string, amount: number, 
        date: Date, type: string
    ) {
        super(id, description, amount, date, type)
    }

    public static create(
        description: string, amount: number, 
        date: Date, type: string
    ): Income {
        return new Income(crypto.randomUUID(), description, 
            amount, date, type);
    }

    public getValues(): Object {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            date: this.getDate(),
            type: this.getType()
        };
    }
}