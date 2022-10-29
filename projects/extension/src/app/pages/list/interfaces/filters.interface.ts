import { SortOperation } from './sort-operation.interface';

export interface Filters {
    readonly searchString: string;
    readonly dataType: string | null;
    readonly sortBy: SortOperation;
}
