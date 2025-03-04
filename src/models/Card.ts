import { Transaction } from "./Transaction";

export class Card extends Transaction {
    private list: any[];
  
    constructor(
        id: string, description: string, amount: number,
        date: Date, type: string, list: any[]
    ) {
        super(id, description, amount, date, type);
        this.list = list;
    }

    public static create(
        description: string, amount: number, 
        date: Date, type: string, list: any[] = []
    ): Card {
        return new Card(crypto.randomUUID(), description, 
            amount, date, type, list);
    }

    public getList(): any[] {
        return this.list;
    }

    public getValues(): Object {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            date: this.getDate(),
            type: this.getType(),
            list: this.getList()
        };
    }
}