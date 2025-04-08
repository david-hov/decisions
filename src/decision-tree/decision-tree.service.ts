import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { Action } from './actions.interface';

import { ActionFactory } from './actions/actions.factory';

@Injectable()
export class DecisionTreeService {
    async execute(body: any): Promise<any[] | any> {
        try {
            const result: Action = ActionFactory.filterByType(body);
            if (Array.isArray(result)) {
                const promises = result.map(action => action.execute());
                const results = await Promise.all(promises);
                return results.flat();
            }
            return await result.execute();
        } catch (error) {
            throw new InternalServerErrorException(error?.message ?? 'Something went wrong');
        }
    }
}
