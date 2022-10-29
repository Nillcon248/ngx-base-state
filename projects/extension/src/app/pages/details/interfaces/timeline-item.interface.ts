import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { TimelineItemTypeEnum } from '../enums';

export interface TimelineItem {
    readonly type: TimelineItemTypeEnum;
    readonly operation?: MetadataOperation;
}
