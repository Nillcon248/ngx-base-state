import { MetadataOperation } from '@extension-interfaces';
import { TimelineItemTypeEnum } from '../enums';

export interface TimelineItem {
    readonly type: TimelineItemTypeEnum;
    readonly operation?: MetadataOperation;
}
