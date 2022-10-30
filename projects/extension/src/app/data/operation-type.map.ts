import { OperationType } from '@extension-interfaces';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state';

export const OPERATION_TYPE_MAP = new Map<ɵMetadataOperationTypeEnum, OperationType>([
    [
        ɵMetadataOperationTypeEnum.Init,
        {
            id: ɵMetadataOperationTypeEnum.Init,
            name: 'Initialized',
            color: '#cbaf00'
        }
    ],
    [
        ɵMetadataOperationTypeEnum.Update,
        {
            id: ɵMetadataOperationTypeEnum.Update,
            name: 'Updated',
            color: '#0077e6'
        }
    ],
    [
        ɵMetadataOperationTypeEnum.Destroy,
        {
            id: ɵMetadataOperationTypeEnum.Destroy,
            name: 'Destroyed',
            color: '#b400e6'
        }
    ]
]);
