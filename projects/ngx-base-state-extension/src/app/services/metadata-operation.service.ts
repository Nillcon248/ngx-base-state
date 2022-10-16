import { Injectable } from '@angular/core';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';
import { switchMap, map } from 'rxjs';
import {
    ChromeTabsService,
    ContentScriptConnectionEnum as ConnectionEnum
} from '../core';
import { MetadataOperationEmitter } from '../emitters';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationService {
    constructor(
        private readonly chromeTabsService: ChromeTabsService,
        private readonly metadataOperationEmitter: MetadataOperationEmitter
    ) {}

    public initObserver(): void {
        this.chromeTabsService.watchForActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.connect<ɵMetadataOperation>(tabId, ConnectionEnum.Operation))
            )
            .subscribe((operation) => this.metadataOperationEmitter.emit(operation));
    }
}
