import { Injectable } from '@angular/core';
import { ChromeActiveTabService } from '@extension-core';
import { MetadataOperation, OperationProcessor } from '@extension-interfaces';
import { map, Observable } from 'rxjs';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryService implements OperationProcessor {
    public readonly data$ = this.operationHistoryState.data$;

    constructor(
        private readonly chromeTabService: ChromeActiveTabService,
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {
        this.initApplicationReloadObserver();
    }

    public onNewOperation(operation: MetadataOperation): void {
        this.operationHistoryState.pushWithinClassId(operation.classId, operation);
    }

    public getAllWithinClassId(classId: number): Observable<MetadataOperation[]> {
        return this.data$
            .pipe(
                map((historyRecord) => historyRecord![classId] as MetadataOperation[])
            );
    }

    private initApplicationReloadObserver(): void {
        this.chromeTabService.onReload$
            .subscribe(() => this.operationHistoryState.restoreInitialData());
    }
}
