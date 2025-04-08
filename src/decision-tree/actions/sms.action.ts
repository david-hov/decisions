import { Action } from '../actions.interface';

export class SendSMSAction implements Action {
    constructor(
        private phone: string,
        private message: string
    ) { }

    async execute(): Promise<any> {
        return `Sending SMS to ${this.phone} - ${this.message}`;
    }
}
