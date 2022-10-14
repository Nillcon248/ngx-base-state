import { Injectable } from '@angular/core';
import { BaseState } from '@ngx-base-state';
import { TimelineItemTypeEnum } from '../enums';
import { TimelineItem } from '../interfaces';

@Injectable()
export class SelectedTimelineItemState extends BaseState<TimelineItem> {
    constructor() {
        super({ type: TimelineItemTypeEnum.Realtime });
    }
}
