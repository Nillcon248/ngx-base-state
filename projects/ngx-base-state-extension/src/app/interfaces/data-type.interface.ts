import { StateDataTypeEnum } from '@extension-enums';

export interface StateDataType {
    readonly id: StateDataTypeEnum;
    readonly name: string;
    readonly color: string;
}
