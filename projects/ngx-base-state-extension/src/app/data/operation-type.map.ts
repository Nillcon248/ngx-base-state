import { OperationType } from '@extension-interfaces';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';

export const OPERATION_TYPE_MAP = new Map<ɵMetadataOperationTypeEnum, OperationType>([
    [
        ɵMetadataOperationTypeEnum.Init,
        {
            type: ɵMetadataOperationTypeEnum.Init,
            name: 'Initialized',
            color: '#cbaf00'
        }
    ],
    [
        ɵMetadataOperationTypeEnum.Update,
        {
            type: ɵMetadataOperationTypeEnum.Update,
            name: 'Updated',
            color: '#0077e6'
        }
    ],
    [
        ɵMetadataOperationTypeEnum.Destroy,
        {
            type: ɵMetadataOperationTypeEnum.Destroy,
            name: 'Destroyed',
            color: '#b400e6'
        }
    ]
]);
