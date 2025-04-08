export enum ActionTypes {
    SMS = 'sms',
    EMAIL = 'email',
    LOOP = 'loop',
    CONDITION = 'condition',
    NONE = 'none',
}

export interface IAction {
    type: ActionTypes;
    expression: string;
    action: IAction;
    count: number;
    phone: string;
    from: string;
    to: string;
    message: string;
    actions: IAction[];
    trueAction: any;
    falseAction: any;
}
