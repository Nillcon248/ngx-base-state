import { OperationType, StateDataType } from '../../../interfaces';

export interface StateShortInfo {
    readonly classId: number;
    readonly className: string;
    readonly classContext: string;
    readonly dataType: StateDataType;
    readonly operationType: OperationType;
}
