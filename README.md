# Post Create Card

    /transaction/card

### Body 
    {
        description: string,
        amount: number,
        date: Date,
        type: "card",
        list: []
    }
### Return
    {
        id: string
        description: string,
        amount: number,
        date: Date,
        type: "card",
        list: []
    }

# Post Create Income

    /transaction/income

### Body 
    {
        description: string,
        amount: number,
        date: Date,
        type: "income"
    }
### Return
    {
        id: string,
        description: string,
        amount: number,
        date: Date,
        type: "income"
    }

# Post Create Expense

    /transaction/expense

### Body 
    {
        description: string,
        amount: number,
        date: Date,
        type: "expense"
    }
### Return
    {
        id: string,
        description: string,
        amount: number,
        date: Date,
        type: "expense"
    }


# Get All

    /transaction

#### Return
    [
        {
            id: string,
            description: string,
            amount: number,
            date: Date,
            type: "expense"
        }
    ]

# Get month

    /transaction

#### Return
    [
        {
            id: string,
            description: string,
            amount: number,
            date: Date,
            type: "expense"
        }
    ]


# Get id

    /transaction/:id

#### Return
    {
        id: string,
        description: string,
        amount: number,
        date: Date,
        type: "expense"
    }

# Get Year And Month

    /transaction/year/:year/month/:month

#### Return
    {
        id: string,
        description: string,
        amount: number,
        date: Date,
        type: "expense"
    }

# Get Year

    /transaction/year/:year

#### Return
    {
        id: string,
        description: string,
        amount: number,
        date: Date,
        type: "expense"
    }
    


