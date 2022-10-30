import { Injectable } from '@angular/core';
import { MetadataOperation } from '@extension-interfaces';
import { filter, Observable } from 'rxjs';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { ActionsState } from '../states';

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
