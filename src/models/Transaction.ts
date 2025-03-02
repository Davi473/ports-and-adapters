import crypto from "crypto";
import Amount from "./Amount";
import Description from "./Description";

export class Transaction {
    protected id: string;
    protected description: Description;
    protected amount: Amount;
    protected date: Date;
    protected income: boolean;
  
    constructor(
        id: string, description: string, amount: number, 
        date: Date, income: boolean
    ) {
        this.id = id;
        this.description = new Description(description);
        this.amount = new Amount(amount);
        this.date = new Date(date);
        this.income = income;
    }

    public static create(
        description: string, amount: number, 
        date: Date, income: boolean
    ): Transaction {
        return new Transaction(crypto.randomUUID(), description, 
            amount, date, income);
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

    public getIncome(): boolean {
        return this.income;
    }

    public getValues(): Object
    {
        return {
            id: this.getID(),
            description: this.getDescription(),
            amount: this.getAmount(),
            data: this.getDate(),
            income: this.getIncome()
        };
    }
}