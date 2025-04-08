import { Action } from '../actions.interface';

export class SendEmailAction implements Action {
    constructor(
        private sender: string,
        private receiver: string,
        private message: string
    ) { }

    async execute(): Promise<any> {
        return `Sending Email from ${this.sender} to ${this.receiver} - ${this.message}`;
    }
}
