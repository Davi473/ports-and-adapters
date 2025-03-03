import crypto from "crypto";
import Amount from "./Amount";
import Description from "./Description";

export type Type = "income" | "expense" | "card"

export class Transaction {
    protected id: string;
    protected description: Description;
    protected amount: Amount;
    protected date: Date;
    protected type: Type;
  
    constructor(
        id: string, description: string, amount: number, 
        date: Date, type: Type
    ) {
        this.id = id;
        this.description = new Description(description);
        this.amount = new Amount(amount);
        this.date = new Date(date);
        this.type = type;
    }

    public static create(
        description: string, amount: number, 
        date: Date, type: Type
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
        return this.type;
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