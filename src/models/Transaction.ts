import crypto from "crypto";
import Amount from "./Amount";
import Description from "./Description";
import Type from "./Type";

export interface ITransaction {
    getValues(): Object
}

export class Transaction implements ITransaction {
    protected id: string;
    protected description: Description;
    protected amount: Amount;
    protected date: Date;
    protected type: Type;
  
    constructor(
        id: string, description: string, amount: number, 
        date: Date, type: string
    ) {
        this.id = id;
        this.description = new Description(description);
        this.amount = new Amount(amount);
        this.date = new Date(date);
        this.type = new Type(type);
    }

    public static create(
        description: string, amount: number, 
        date: Date, type: string
    ): Transaction {
        return new Transaction(crypto.randomUUID(), description, 
            amount, date, type);
    }

    public getID(): string
    {
        return this.id;
    }

    public getDescription(): string {
        return this.description.getValue();
    }

    public getAmount(): number {
        return this.amount.getValue();
    }

    public getDate(): Date {
        return this.date;
    }

    public getType(): string {
        return this.type.getValue();
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