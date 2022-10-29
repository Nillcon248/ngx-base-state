import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'projects/library/src/lib';
import { TimelineItemTypeEnum } from '../enums';
import { TimelineItem } from '../interfaces';

@NgxState()
@Injectable()
export class SelectedTimelineItemState extends ObjectState<TimelineItem> {
    constructor() {
        super({ type: TimelineItemTypeEnum.Realtime });
    }
}
