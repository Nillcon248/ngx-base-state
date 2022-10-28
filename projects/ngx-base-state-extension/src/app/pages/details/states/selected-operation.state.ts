import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from '@ngx-base-state';
import { TimelineItemTypeEnum } from '../enums';
import { TimelineItem } from '../interfaces';

@NgxState()
@Injectable()
export class SelectedTimelineItemState extends ObjectState<TimelineItem> {
    constructor() {
        super({ type: TimelineItemTypeEnum.Realtime });
    }
}
