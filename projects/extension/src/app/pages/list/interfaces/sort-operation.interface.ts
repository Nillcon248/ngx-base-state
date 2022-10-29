import { MetadataOperation } from 'projects/extension/src/app/interfaces';

export interface SortOperation {
    readonly name: string;
    readonly compareFn: (operationA: MetadataOperation, operationB: MetadataOperation) => number;
}
