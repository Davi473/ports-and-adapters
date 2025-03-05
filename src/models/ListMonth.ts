import { Month } from "./Month";
import { Transaction } from "./Transaction";

export class ListMonth {
    private list: Transaction[];
    private listMonth: any[];

    constructor(
        list: Transaction[]
    ) {
        this.list = list;
        this.listMonth = [];
        this.organize();
    }

    public getListMonth(): any[] {
        return this.listMonth;
    }

    private organize(): void {
        const reduce: {} = this.list.reduce((object: any, transaction) => {
            const month = transaction.getDate().getMonth() + 1;
            const year = transaction.getDate().getFullYear();
            const date = `${month}/${year}`;
            if (!object[date]) object[date] = new Month(month, year);
            if (transaction.getType() === "income") object[date].sumIncome(transaction.getAmount()); 
            if (transaction.getType() !== "income") object[date].sumExpense(transaction.getAmount()); 
            return object;
        }, {});
        Object.values(reduce).forEach(months => this.listMonth.push(months))
    }
}