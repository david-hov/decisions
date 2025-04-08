import { Body, Controller, Post } from '@nestjs/common';

import { DecisionTreeService } from './decision-tree.service';
import { RequestBody } from './dto/actions.dto';

@Controller('decision')
export class DecisionTreeController {
    constructor(private readonly service: DecisionTreeService) { }

    @Post()
    async execute(@Body() body: RequestBody) {
        try {
            const result = await this.service.execute(body);
            return { message: result };
        } catch (error) {
            return { error: error.message };
        }
    }
}
