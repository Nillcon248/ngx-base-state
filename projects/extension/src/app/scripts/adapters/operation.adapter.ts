import {
    ɵMetadataOperation
} from 'projects/library/src/lib/interfaces/metadata-operation.interface';
import { MetadataOperation } from '../../interfaces/metadata-operation.interface';
import { UnknownDataSimplifier } from '../helpers/data-simplifier/unknown-data.simplifier';
import { adaptDataToType } from './data-type.adapter';

export function adaptOperationToExtensionFormat(operation: ɵMetadataOperation): MetadataOperation {
    return {
        ...operation,
        data: UnknownDataSimplifier.process(operation.data),
        dataType: adaptDataToType(operation.data)
    };
}
