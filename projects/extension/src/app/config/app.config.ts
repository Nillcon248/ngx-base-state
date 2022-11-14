import { inject, Injectable } from '@angular/core';
import { MetadataOperation, OperationProcessor } from '@extension/interfaces';
import {
    ActionsService,
    DataTypeService,
    MetadataOperationHistoryService,
    MetadataOperationService
} from '@extension/services';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    private readonly operationProcessors: OperationProcessor[] = [
        inject(DataTypeService),
        inject(ActionsService),
        inject(MetadataOperationHistoryService)
    ];

    constructor(
        private readonly metadataOperationService: MetadataOperationService
    ) {}

    public load(): void {
        this.initOperationsObserver();
    }

    private initOperationsObserver(): void {
        this.metadataOperationService.observeOperations()
            .subscribe((operation) => this.notifyOperationProcessors(operation));
    }

    private notifyOperationProcessors(newOperation: MetadataOperation): void {
        this.operationProcessors
            .forEach((processor) => processor.onNewOperation(newOperation));
    }
}
