import { ɵMetadataOperationTypeEnum } from 'projects/library/src/lib';

export interface OperationType {
    readonly id: ɵMetadataOperationTypeEnum;
    readonly name: string;
    readonly color: string;
}
