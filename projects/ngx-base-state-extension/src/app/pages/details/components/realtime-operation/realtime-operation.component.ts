import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MetadataService } from '@extension-services';
import { OPENED_CLASS_ID } from '../../consts';

@Component({
    selector: 'app-realtime-operation',
    templateUrl: './realtime-operation.component.html',
    styleUrls: ['./realtime-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeOperationComponent {
    public readonly lastOperation$ = this.metadataService.getWithinClassId(this.openedClassId);

    constructor(
        @Inject(OPENED_CLASS_ID) private readonly openedClassId: number,
        private readonly metadataService: MetadataService
    ) {}
}
