import { Expense } from "../../src/models/Expense";

test("Create Expense", () => {
    const description = "Test";
    const amount = 100;
    const data = new Date();
    const expense = Expense.create(description, amount, data);
    expect(expense.getDescription()).toBe(description);
    expect(expense.getAmount()).toBe(amount.toFixed(2).replace(".", ","));
    expect(expense.getDate()).toBe(data.toISOString());
});
