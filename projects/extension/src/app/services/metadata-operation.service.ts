import { Injectable } from '@angular/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { map, switchMap } from 'rxjs';
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
        this.chromeTabsService.getActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.connect<MetadataOperation>(tabId, ConnectionEnum.Operation))
            )
            .subscribe((operation) => this.metadataOperationEmitter.emit(operation));
    }
}
