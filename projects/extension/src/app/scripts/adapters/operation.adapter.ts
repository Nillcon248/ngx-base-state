import {
    ɵMetadataOperation
} from 'projects/library/src/lib/interfaces/metadata-operation.interface';
import { MetadataOperation } from '../../interfaces/metadata-operation.interface';
import { simplifyOperationData } from '../functions/operation-data-simplifier.function';
import { adaptDataToType } from './data-type.adapter';

export function adaptOperationToExtensionFormat(operation: ɵMetadataOperation): MetadataOperation {
    return {
        ...operation,
        data: simplifyOperationData(operation.data),
        dataType: adaptDataToType(operation.data)
    };
}
