import { Injectable } from '@angular/core';
import { ChromeActiveTabService } from '@extension-core';
import { MetadataOperation, OperationProcessor } from '@extension-interfaces';
import { Observable } from 'rxjs';
import { ActionsState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class ActionsService implements OperationProcessor {
    public readonly data$ = (this.actionsState.data$ as Observable<MetadataOperation[]>);

    constructor(
        private readonly chromeTabService: ChromeActiveTabService,
        private readonly actionsState: ActionsState
    ) {
        this.initApplicationReloadObserver();
    }

    public onNewOperation(operation: MetadataOperation): void {
        if (operation.actionName) {
            this.actionsState.register(operation);
        }
    }

    private initApplicationReloadObserver(): void {
        this.chromeTabService.onReload$
            .subscribe(() => this.actionsState.restoreInitialData());
    }
}
