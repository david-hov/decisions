import { Action } from '../actions.interface';

export class LoopAction implements Action {
    constructor(
        private count: number,
        private action: Action
    ) { }

    async execute(): Promise<any> {
        const results: any[] = [];
        for (let i = 0; i < this.count; i++) {
            const result = await this.action.execute();
            results.push(result);
        }
        return results;
    }
}
