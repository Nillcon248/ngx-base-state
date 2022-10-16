import { ɵMetadataOperation } from '@ngx-base-state/interfaces';
import { TimelineItemTypeEnum } from '../enums';

export interface TimelineItem {
    readonly type: TimelineItemTypeEnum;
    readonly operation?: ɵMetadataOperation;
}
