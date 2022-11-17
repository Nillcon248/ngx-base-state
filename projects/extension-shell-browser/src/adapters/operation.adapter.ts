import { UnknownDataSimplifier } from '../helpers';
import { OriginalMetadataOperation, ProcessedMetadataOperation } from '../interfaces';
import { adaptDataToType } from './data-type.adapter';

export function adaptOperationToExtensionFormat(
    operation: OriginalMetadataOperation
): ProcessedMetadataOperation {
    return {
        ...operation,
        data: UnknownDataSimplifier.process(operation.data),
        dataType: adaptDataToType(operation.data)
    };
}
