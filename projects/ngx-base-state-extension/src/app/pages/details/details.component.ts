import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OPENED_CLASS_NAME_PROVIDER } from './consts';
import { TimelineItemTypeEnum } from './enums';
import { SelectedTimelineItemState } from './states';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OPENED_CLASS_NAME_PROVIDER,
        SelectedTimelineItemState
    ]
})
export class DetailsComponent {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;
    public readonly selectedTimelineItem$ = this.selectedTimelineItemState.data$;

    constructor(
        private readonly selectedTimelineItemState: SelectedTimelineItemState
    ) {}
}
