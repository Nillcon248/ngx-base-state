import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MetadataOperationHistoryService } from '@extension-services';
import { TimelineItemTypeEnum } from '../../enums';
import { OPENED_CLASS_NAME } from '../../../../consts';
import { SelectedTimelineItemState } from '../../states';
import { ɵMetadataOperation } from '@ngx-base-state/classes';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;

    public readonly operationHistory$ = this.metadataOperationHistoryService
        .getAllWithinClassName(this.openedClassName);

    constructor(
        @Inject(OPENED_CLASS_NAME) private readonly openedClassName: string,
        private readonly selectedTimelineItemState: SelectedTimelineItemState,
        private readonly metadataOperationHistoryService: MetadataOperationHistoryService
    ) {}

    public onTimelineItemClick(type: TimelineItemTypeEnum, operation?: ɵMetadataOperation): void {
        this.selectedTimelineItemState.set({ type, operation });
    }
}
