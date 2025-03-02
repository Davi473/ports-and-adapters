import express from 'express';
import cors from 'cors';

type Method = 'get' | 'post' | 'put' | 'delete';

export default interface HttpServer {
    register (method: Method, url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async register(method: Method, url: string, callback: Function): Promise<void> 
    {
        this.app[method](url, async (req: any, res: any) => 
        {
            const response = await callback(req, res);
            if (response) res.json(response);
        });
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}