import { MetadataOperation } from './metadata-operation.interface';

export interface OperationProcessor {
    onNewOperation(operation: MetadataOperation): void;
}
