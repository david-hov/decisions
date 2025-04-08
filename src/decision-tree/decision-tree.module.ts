import { Module } from '@nestjs/common';

import { DecisionTreeController } from './decision-tree.controller';
import { DecisionTreeService } from './decision-tree.service';

@Module({
    controllers: [DecisionTreeController],
    providers: [DecisionTreeService]
})

export class DecisionTreeModule { }
