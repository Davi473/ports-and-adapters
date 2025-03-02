import ExpenseRepository, { MemoryExpenseRepository } from '../../src/repositories/ExpenseRepository';
import { ExpenseService } from '../../src/services/ExpenseService';

let repository: ExpenseRepository;
let service: ExpenseService;

beforeEach(() => {
    repository = new MemoryExpenseRepository();
    service = new ExpenseService(repository);
});

test("Create Expense Service", async () => {
    const expense = {
        description: "Test",
        amount: 100,
        date: new Date()
    }
    const created = await service.createExpense(expense);
    expect(created.id).toBeDefined();
    expect(created.description).toBeDefined();
    expect(created.amount).toBe(expense.amount.toFixed(2).replace(".", ","));
    expect(created.date).toBe(expense.date.toISOString());
});

test("Error in amount", async () => {
    const expense = {
        description: "Test",
        amount: "10,54",
        date: new Date()
    }
    const created = await service.createExpense(expense);
    console.log(created);
    expect(created.id).toBeDefined();
    expect(created.description).toBeDefined();
    expect(created.amount).toBe(expense.amount);
    expect(created.date).toBe(expense.date.toISOString());
});