import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { MetadataState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$ = this.metadataState.data$ as Observable<Map<string, unknown>>;

    constructor(
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly metadataOperationEmitter: MetadataOperationEmitter,
        private readonly metadataState: MetadataState
    ) {
        this.initApplicationReloadObserver();
    }

    public initObserver(): void {
        this.metadataOperationEmitter.data$
            .subscribe((operation) => this.metadataState.updateByOperation(operation));
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.metadataState.restoreInitialValue());
    }
}
