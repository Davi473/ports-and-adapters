import pgp from 'pg-promise';

export default interface DatabaseConnection {
    query (statement: string, params?: any[]): Promise<any>;
    close (): Promise<void>
}

export class PgPromiseAdapter implements DatabaseConnection {
    private connection: any;

    constructor () 
    {
        this.connection = pgp()("postgres://postgres:123@localhost:5432/expense");
    }

    public async query(statement: string, params?: any[]) 
    {
        const output = await this.connection.query(statement, params);
        return output;
    }

    public async close(): Promise<void>
    {
        return this.connection.$pool.end();
    }
}