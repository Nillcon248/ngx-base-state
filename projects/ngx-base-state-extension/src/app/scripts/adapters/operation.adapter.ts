import { ɵMetadataOperation } from 'projects/ngx-base-state/src/lib/interfaces/metadata-operation.interface';
import { removeCircularReferences } from '../../core/helpers/circular-reference-remover.helper';
import { isObject } from '../../core/helpers/methods.helpers';
import { MetadataOperation } from '../../interfaces/metadata-operation.interface';
import { simplifyUnknownData } from '../functions/operation-data-simplifier.function';
import { adaptDataToType } from './data-type.adapter';

export function adaptOperationToExtensionFormat(operation: ɵMetadataOperation): MetadataOperation {
    return {
        ...operation,
        data: simplifyUnknownData(
            removeCircularReferencesFromComplexStructures(operation.data)
        ),
        dataType: adaptDataToType(operation.data)
    };
}

function removeCircularReferencesFromComplexStructures(data: unknown): any {
    if (Array.isArray(data) || isObject(data)) {
        return removeCircularReferences(data);
    }

    return data;
}
