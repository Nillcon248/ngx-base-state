import { OriginalMetadataOperation } from './original-operation-metadata.interface';

export interface ProcessedMetadataOperation extends OriginalMetadataOperation {
    readonly dataType: string;
}
