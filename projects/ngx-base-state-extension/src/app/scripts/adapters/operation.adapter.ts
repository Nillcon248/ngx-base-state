import { ɵMetadataOperation } from '@ngx-base-state';
import { MetadataOperation } from '@extension-interfaces';
import { adaptDataToType } from './data-type.adapter';
import { processUnknownData } from '../functions/operation-data-simplifier.function';

export function adaptOperationToExtensionFormat(operation: ɵMetadataOperation): MetadataOperation {
    return {
        ...operation,
        data: processUnknownData(operation.data),
        dataType: adaptDataToType(operation.data)
    };
}
