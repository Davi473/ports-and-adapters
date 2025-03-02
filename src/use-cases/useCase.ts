export default interface UseCase
{
    execute(value: any): Promise<any>;
}