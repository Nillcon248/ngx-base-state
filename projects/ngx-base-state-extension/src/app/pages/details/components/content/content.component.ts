import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimelineItemTypeEnum } from './enums';
import { SelectedTimelineItemState } from './states';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SelectedTimelineItemState
    ]
})
export class ContentComponent {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;
    public readonly selectedTimelineItem$ = this.selectedTimelineItemState.data$;

    constructor(
        private readonly selectedTimelineItemState: SelectedTimelineItemState
    ) {}
}
