import { Injectable } from '@angular/core';
import {
    ChromeTabsService,
    ContentScriptConnectionEnum as ConnectionEnum
} from 'projects/extension/src/app/core';
import { map, switchMap } from 'rxjs';
import { ApplicationReloadEmitter } from '../emitters';

@Injectable({
    providedIn: 'root'
})
export class ApplicationReloadService {
    public onReload$ = this.applicationReloadEmitter.data$;

    constructor(
        private readonly chromeTabsService: ChromeTabsService,
        private readonly applicationReloadEmitter: ApplicationReloadEmitter
    ) {}

    public initObserver(): void {
        this.chromeTabsService.getActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.connect(tabId, ConnectionEnum.AppInit))
            )
            .subscribe(() => this.applicationReloadEmitter.emit(true));
    }
}