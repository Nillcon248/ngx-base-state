import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';

export interface Filters {
    readonly searchString: string;
    readonly operationType: ɵMetadataOperationTypeEnum | null;
}
