import { OperationType, StateDataType } from '../../../interfaces';

export interface StateShortInfo {
    readonly className: string;
    readonly dataType: StateDataType;
    readonly operationType: OperationType;
}
