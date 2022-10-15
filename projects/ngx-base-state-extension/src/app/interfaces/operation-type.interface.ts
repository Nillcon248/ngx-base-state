import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';

export interface OperationType {
    readonly id: ɵMetadataOperationTypeEnum;
    readonly name: string;
    readonly color: string;
}
