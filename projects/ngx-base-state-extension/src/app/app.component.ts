import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
    DataTypeService,
    MetadataService,
    MetadataOperationHistoryService,
    MetadataOperationService,
    ApplicationReloadService
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
        private readonly metadataService: MetadataService,
        private readonly metadataOperationHistoryService: MetadataOperationHistoryService,
        private readonly metadataOperationService: MetadataOperationService,
        private readonly dataTypeService: DataTypeService
    ) {}

    public ngOnInit(): void {
        this.applicationReloadService.initObserver();
        this.metadataService.initObserver();
        this.metadataOperationService.initObserver();
        this.dataTypeService.initObserver();
        this.metadataOperationHistoryService.initObserver();
    }
}
