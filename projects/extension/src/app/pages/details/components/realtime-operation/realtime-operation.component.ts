import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MetadataService } from 'projects/extension/src/app/services';
import { OPENED_CLASS_ID } from '../../consts';
import { ValuePreviewerExpansionState } from '../../states';

@Component({
    selector: 'app-realtime-operation',
    templateUrl: './realtime-operation.component.html',
    styleUrls: ['./realtime-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeOperationComponent {
    public readonly lastOperation$ = this.metadataService.getWithinClassId(this.openedClassId);
    public readonly isValueViewerExpanded$ = this.valueViewerExpansionState.data$;

    constructor(
        @Inject(OPENED_CLASS_ID) private readonly openedClassId: number,
        private readonly metadataService: MetadataService,
        private readonly valueViewerExpansionState: ValuePreviewerExpansionState
    ) {}
}
