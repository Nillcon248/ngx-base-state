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
    public readonly realtimeData$: Observable<unknown> = this.metadataService.data$
        .pipe(
            map((metadata) => metadata.get(this.openedClassName))
        );

    public readonly lastOperation$ = this.operationHistoryService.data$
        .pipe(
            map((operationHistoryMap) => operationHistoryMap.get(this.openedClassName)),
            map((operations) => operations![operations!.length - 1]),
            share()
        );

    constructor(
        @Inject(OPENED_CLASS_NAME) private readonly openedClassName: string,
        private readonly metadataService: MetadataService,
        private readonly operationHistoryService: MetadataOperationHistoryService
    ) {}
}
