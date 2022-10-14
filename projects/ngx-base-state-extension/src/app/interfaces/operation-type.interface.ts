import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';

export interface OperationType {
    readonly type: ɵMetadataOperationTypeEnum;
    readonly name: string;
    readonly color: string;
}
