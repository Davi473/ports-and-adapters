export default interface EmailAdapter {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}

export class EmailTest implements EmailAdapter
{
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        console.log(to,subject, body);
    }
    
}