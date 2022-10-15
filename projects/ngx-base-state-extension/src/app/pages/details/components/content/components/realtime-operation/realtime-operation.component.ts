import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MetadataOperationHistoryService, MetadataService } from '@extension-services';
import { map, Observable, share } from 'rxjs';
import { OPENED_CLASS_NAME } from '../../../../consts';

@Component({
    selector: 'app-realtime-operation',
    templateUrl: './realtime-operation.component.html',
    styleUrls: ['./realtime-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeOperationComponent {
    public readonly lastOperation$ = this.metadataService.getWithinClass(this.openedClassName);

    constructor(
        @Inject(OPENED_CLASS_NAME) private readonly openedClassName: string,
        private readonly metadataService: MetadataService
    ) {}
}
