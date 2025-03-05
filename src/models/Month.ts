export class Month {
    private month: number;
    private year: number;
    private incomeAmount: number;
    private expenseAmount: number
      
    constructor(
        month: number, year: number
    ) {
        this.month = month;
        this.year = year;
        this.incomeAmount = 0;
        this.expenseAmount = 0;
    }

    public getMonth(): number {
        return this.month;
    }

    public getYear(): number {
        return this.year;
    }

    public sumIncome(amount: number): void {
        this.incomeAmount += amount;
    }

    public sumExpense(amount: number): void {
        this.expenseAmount += amount;
    }
}