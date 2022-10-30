import { Injectable } from '@angular/core';
import { MetadataOperation } from '@extension-interfaces';
import { map, Observable } from 'rxjs';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryService {
    public readonly data$ = this.operationHistoryState.data$;

    constructor(
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly operationEmitter: MetadataOperationEmitter,
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {
        this.initApplicationReloadObserver();
    }

    public initObserver(): void {
        this.operationEmitter.data$
            .subscribe((operation) => {
                this.operationHistoryState.pushWithinClassId(operation.classId, operation);
            });
    }

    public getAllWithinClassId(classId: number): Observable<MetadataOperation[]> {
        return this.data$
            .pipe(
                map((historyRecord) => historyRecord![classId] as MetadataOperation[])
            );
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.operationHistoryState.restoreInitialData());
    }
}
