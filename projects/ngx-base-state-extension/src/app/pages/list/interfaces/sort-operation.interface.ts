import { MetadataOperation } from '@extension-interfaces';

export interface SortOperation {
    readonly name: string;
    readonly compareFn: (operationA: MetadataOperation, operationB: MetadataOperation) => number;
}
