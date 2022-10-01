import { RuntimeMessageEnum } from '../enums/runtime-message.enum';

export interface RuntimeMessage<T = unknown> {
    readonly type: RuntimeMessageEnum;
    readonly data?: T;
}
