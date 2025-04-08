import {
    IsEnum,
    IsString,
    ValidateNested,
    ValidateIf,
    IsOptional,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ActionTypes {
    SMS = 'sms',
    EMAIL = 'email',
    LOOP = 'loop',
    CONDITION = 'condition',
    NONE = 'none',
}

export class ValidatorBody {
    @IsEnum(ActionTypes)
    type: ActionTypes;

    @ValidateIf((o) => o.type === ActionTypes.CONDITION)
    @IsString()
    expression?: string;

    @ValidateIf((o) => o.type === ActionTypes.SMS)
    @IsString()
    phone?: string;

    @ValidateIf((o) => o.type === ActionTypes.EMAIL)
    @IsString()
    from?: string;

    @ValidateIf((o) => o.type === ActionTypes.EMAIL)
    @IsString()
    to?: string;

    @ValidateIf((o) => o.type === ActionTypes.EMAIL || o.type === ActionTypes.SMS)
    @IsString()
    message?: string;


    @ValidateIf((o) => o.type === ActionTypes.CONDITION)
    @ValidateNested({ each: true })
    @Type(() => ValidatorBody)
    trueAction?: ValidatorBody[];

    @ValidateIf((o) => o.type === ActionTypes.CONDITION)
    @ValidateNested({ each: true })
    @Type(() => ValidatorBody)
    falseAction?: ValidatorBody[];
}

export class RequestBody {
    @IsEnum(ActionTypes)
    @IsOptional()
    type?: ActionTypes;

    @ValidateNested({ each: true })
    @Type(() => ValidatorBody)
    actions?: ValidatorBody[];

    @ValidateIf((o) => o.type === ActionTypes.LOOP)
    action?: ValidatorBody;

    @ValidateIf((o) => o.type === ActionTypes.LOOP)
    @IsNotEmpty()
    count: number;
}
