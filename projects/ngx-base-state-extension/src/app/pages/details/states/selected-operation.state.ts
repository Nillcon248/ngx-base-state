import { Injectable } from '@angular/core';
import { BaseState, NgxState } from '@ngx-base-state';
import { TimelineItemTypeEnum } from '../enums';
import { TimelineItem } from '../interfaces';

@NgxState()
@Injectable()
export class SelectedTimelineItemState extends BaseState<TimelineItem> {
    constructor() {
        super({ type: TimelineItemTypeEnum.Realtime });
    }
}
