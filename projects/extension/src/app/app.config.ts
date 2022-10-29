import { Injectable } from '@angular/core';
import {
    ActionsService,
    ApplicationReloadService,
    DataTypeService,
    MetadataOperationHistoryService,
    MetadataOperationService
} from '@extension-services';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    constructor(
        private readonly applicationReloadService: ApplicationReloadService,
        private readonly metadataOperationHistoryService: MetadataOperationHistoryService,
        private readonly metadataOperationService: MetadataOperationService,
        private readonly dataTypeService: DataTypeService,
        private readonly actionsService: ActionsService
    ) {}

    public load(): void {
        this.applicationReloadService.initObserver();
        this.metadataOperationService.initObserver();
        this.dataTypeService.initObserver();
        this.actionsService.initObserver();
        this.metadataOperationHistoryService.initObserver();
    }
}
