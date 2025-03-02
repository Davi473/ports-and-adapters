import EmailAdapter from "../repositories/EmailAdapter";

export default class EmailService
{
    constructor (readonly email: EmailAdapter) {}
    async sendEmail(email: string, message: string)
    {
        console.log(`Email sent to ${email} with message: ${message}`);
    }
}