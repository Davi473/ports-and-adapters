import axios from "axios";

axios.defaults.validateStatus = () => true;

test("create expense", async () => {
    const expense = {
        description: "Test",
        amount: 100,
        date: new Date(),
        type: "expense"
    }
    const responseCreate = await axios.post("http://localhost:3000/transaction/expense", expense);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get(`http://localhost:3000/transaction/${outputCreate.id}`);
    const outputGet = responseGet.data;
    expect(responseGet.status).toBe(200);
    expect(outputGet.name).toBe(outputCreate.name);
    expect(outputGet.description).toBe(outputCreate.description);
    expect(outputGet.date).toBe(outputCreate.date);
    expect(outputGet.type).toBe(outputCreate.type);
});

test("create income", async () => {
    const income = {
        description: "Test",
        amount: 100,
        date: new Date(),
        type: "income"
    }
    const responseCreate = await axios.post("http://localhost:3000/transaction/income", income);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get(`http://localhost:3000/transaction/${outputCreate.id}`);
    const outputGet = responseGet.data;
    expect(responseGet.status).toBe(200);
    expect(outputGet.name).toBe(outputCreate.name);
    expect(outputGet.description).toBe(outputCreate.description);
    expect(outputGet.date).toBe(outputCreate.date);
    expect(outputGet.type).toBe(outputCreate.type);
});

test("create card", async () => {
    const card = {
        description: "Test",
        amount: 100,
        date: new Date(),
        type: "card",
        list: []
    }
    const responseCreate = await axios.post("http://localhost:3000/transaction/card", card);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get(`http://localhost:3000/transaction/${outputCreate.id}`);
    const outputGet = responseGet.data;
    expect(responseGet.status).toBe(200);
    expect(outputGet.name).toBe(outputCreate.name);
    expect(outputGet.description).toBe(outputCreate.description);
    expect(outputGet.date).toBe(outputCreate.date);
    expect(outputGet.type).toBe(outputCreate.type);
});

test("check month and year filter", async () => {
    const month = 4
    const year = 2023
    const card = {
        description: "Test Month/Year",
        amount: 100,
        date: new Date(`${month}-02-${year}`),
        type: "card",
        list: []
    }
    const responseCreate = await axios.post("http://localhost:3000/transaction/card", card);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get(`http://localhost:3000/transaction/year/${year}/month/${month}`);
    const outputGet = responseGet.data[0];
    expect(responseGet.status).toBe(200);
    expect(new Date(outputGet.date).getFullYear()).toBe(new Date(outputCreate.date).getFullYear());
    expect(new Date(outputGet.date).getMonth()).toBe(new Date(outputCreate.date).getMonth());
});


test("check year filter", async () => {
    const year = 2023
    const card = {
        description: "Test Month/Year",
        amount: 100,
        date: new Date(`05-02-${year}`),
        type: "card",
        list: []
    }
    const responseCreate = await axios.post("http://localhost:3000/transaction/card", card);
    const outputCreate = responseCreate.data;
    expect(responseCreate.status).toBe(201);
    expect(outputCreate.id).toBeDefined();
    const responseGet = await axios.get(`http://localhost:3000/transaction/year/${year}`);
    const outputGet = responseGet.data[0];
    expect(responseGet.status).toBe(200);
    expect(new Date(outputGet.date).getFullYear()).toBe(new Date(outputCreate.date).getFullYear());
});