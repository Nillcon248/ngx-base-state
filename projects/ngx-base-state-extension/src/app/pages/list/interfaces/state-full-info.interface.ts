import { ɵMetadataOperation } from '@ngx-base-state';
import { StateDataType } from '../../../interfaces';

export interface StateFullInfo {
    readonly operation: ɵMetadataOperation;
    readonly dataType: StateDataType;
}
