import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryService {
    public readonly data$ = this.operationHistoryState.data$ as Observable<Map<string, ɵMetadataOperation[]>>;

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
                this.operationHistoryState.pushWithinClassName(operation.className, operation);
            });
    }

    public getAllWithinClassName(className: string): Observable<ɵMetadataOperation[]> {
        return this.data$
            .pipe(
                map((historyMap) => historyMap.get(className) as ɵMetadataOperation[])
            );
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.operationHistoryState.restoreInitialValue());
    }
}
