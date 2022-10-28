import { MetadataOperation } from '@extension-interfaces';
import { ɵMetadataOperation } from '@ngx-base-state';
import { removeCircularReferences } from '../../core/helpers/circular-reference-remover.helper';
import { processUnknownData } from '../functions/operation-data-simplifier.function';
import { adaptDataToType } from './data-type.adapter';

export function adaptOperationToExtensionFormat(operation: ɵMetadataOperation): MetadataOperation {
    return {
        ...operation,
        data: processUnknownData(removeCircularReferences(operation.data)),
        dataType: adaptDataToType(operation.data)
    };
}
