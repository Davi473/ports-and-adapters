import axios from "axios";

axios.defaults.validateStatus = () => true;

test("create expense", async () => {
    const expense = {
        description: "Test",
        amount: 100,
        date: new Date(),
        income: true
    }
    const responseCreate = await axios.post("http://localhost:3000/expenses", expense);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get("http://localhost:3000/expenses");
    const outputGet = responseGet.data[responseGet.data.length - 1];
    console.log(outputGet, outputCreate);
    expect(responseGet.status).toBe(200);
    expect(outputGet.name).toBe(outputCreate.name);
    expect(outputGet.description).toBe(outputCreate.description);
    expect(outputGet.date).toBe(outputCreate.date);
    expect(outputGet.income).toBe(outputCreate.income);
});