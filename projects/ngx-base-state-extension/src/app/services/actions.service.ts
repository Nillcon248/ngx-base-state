import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { MetadataOperation } from '@extension-interfaces';
import { ActionsState } from '../states';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';

@Injectable({
    providedIn: 'root'
})
export class ActionsService {
    public readonly data$ = (this.actionsState.data$ as Observable<MetadataOperation[]>);

    constructor(
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly metadataOperationEmitter: MetadataOperationEmitter,
        private readonly actionsState: ActionsState
    ) {
        this.initApplicationReloadObserver();
    }

    public initObserver(): void {
        this.metadataOperationEmitter.data$
            .pipe(
                filter((operation) => !!operation.actionName)
            )
            .subscribe((operation) => this.actionsState.register(operation));
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.actionsState.restoreInitialData());
    }
}
