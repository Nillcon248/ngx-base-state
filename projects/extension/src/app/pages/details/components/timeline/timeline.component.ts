import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { MetadataOperationHistoryService } from 'projects/extension/src/app/services';
import { OPENED_CLASS_ID } from '../../consts';
import { TimelineItemTypeEnum } from '../../enums';
import { SelectedTimelineItemState } from '../../states';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;

    public readonly operationHistory$ = this.metadataOperationHistoryService
        .getAllWithinClassId(this.openedClassId);

    constructor(
        @Inject(OPENED_CLASS_ID) private readonly openedClassId: number,
        private readonly selectedTimelineItemState: SelectedTimelineItemState,
        private readonly metadataOperationHistoryService: MetadataOperationHistoryService
    ) {}

    public onTimelineItemClick(type: TimelineItemTypeEnum, operation?: MetadataOperation): void {
        this.selectedTimelineItemState.set({ type, operation });
    }

    public trackByHistoricalOperation(index: number, operation: MetadataOperation): string {
        return operation.date;
    }
}
