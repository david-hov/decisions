import { SendEmailAction } from '../actions/email.actions';
import { LoopAction } from '../actions/loop.actions';
import { SendSMSAction } from '../actions/sms.action';
import { IAction } from '../interfaces/action.interface';

export class ActionFactory {
    static filterByType(body: IAction) {
        if (Array.isArray(body.actions)) {
            return body.actions.map((item) => this.filterByType(item)).flat();
        }
        switch (body.type) {
            case 'sms':
                return new SendSMSAction(body.phone, body.message);
            case 'email':
                return new SendEmailAction(body.from, body.to, body.message);
            case 'condition':
                const shouldRun = '01-01-2025' === body.expression;
                if (shouldRun) {
                    return this.filterByType({ actions: body.trueAction } as IAction)
                } else {
                    return this.filterByType({ actions: body.falseAction } as IAction);
                }
            case 'loop':
                return new LoopAction(body.count, this.filterByType(body.action));
            default:
                throw new Error(`Unknown action type: ${body.type}`);
        }
    }
}
