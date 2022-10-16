import { StateDataType } from '../../../interfaces';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';

export interface StateFullInfo {
    readonly operation: ɵMetadataOperation;
    readonly dataType: StateDataType;
}
