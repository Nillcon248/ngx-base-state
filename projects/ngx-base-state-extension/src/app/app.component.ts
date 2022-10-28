import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    ActionsService,
    ApplicationReloadService,
    DataTypeService,
    MetadataOperationHistoryService,
    MetadataOperationService
} from '@extension-services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    constructor(
        private readonly applicationReloadService: ApplicationReloadService,
        private readonly metadataOperationHistoryService: MetadataOperationHistoryService,
        private readonly metadataOperationService: MetadataOperationService,
        private readonly dataTypeService: DataTypeService,
        private readonly actionsService: ActionsService
    ) {}

    public ngOnInit(): void {
        this.applicationReloadService.initObserver();
        this.metadataOperationService.initObserver();
        this.dataTypeService.initObserver();
        this.actionsService.initObserver();
        this.metadataOperationHistoryService.initObserver();
    }
}
