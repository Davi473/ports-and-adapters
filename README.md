# Get All

    http://localhost:3000/expenses

#### Return
    [
        {
            id: string,
            description: string,
            amount: number,
            income: boolean
        }
    ]
# Post Income

    http://localhost:3000/expenses
#### Body
    {
        description: string,
        amount: number,
        income: boolean
    }
#### Return
    {
        id: string,
        description: string,
        amount: number,
        income: boolean
    }

