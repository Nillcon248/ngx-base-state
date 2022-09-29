import { RuntimeMessageEnum } from '../enums';

export interface RuntimeMessage<T = any> {
    readonly type: RuntimeMessageEnum;
    readonly data?: T;
}
