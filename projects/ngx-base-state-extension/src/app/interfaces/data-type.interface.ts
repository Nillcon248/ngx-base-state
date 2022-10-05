import { StateDataTypeEnum } from '@extension-core';

export interface StateDataType {
    readonly id: StateDataTypeEnum;
    readonly name: string;
    readonly color: string;
}
