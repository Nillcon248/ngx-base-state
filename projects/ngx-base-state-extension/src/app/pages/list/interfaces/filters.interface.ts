import { StateDataTypeEnum } from '@extension-enums';
import { SortOperation } from './sort-operation.interface';

export interface Filters {
    readonly searchString: string;
    readonly dataType: StateDataTypeEnum | null;
    readonly sortBy: SortOperation;
}
