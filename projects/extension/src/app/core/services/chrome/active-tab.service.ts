import { Injectable } from '@angular/core';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { ContentScriptConnectionEnum as ConnectionEnum } from '../../enums';
import { RuntimeMessage } from '../../interfaces';
import { ChromeActiveTabReloadService } from './active-tab-reload.service';
import { ChromeTabsService } from './tabs.service';

@Injectable({
    providedIn: 'root'
})
export class ChromeActiveTabService {
    public readonly data$ = this.tabsService.getActive()
        .pipe(
            shareReplay(1)
        );

    public readonly onReload$ = this.tabReloadService.emitter$;

    constructor(
        private readonly tabsService: ChromeTabsService,
        private readonly tabReloadService: ChromeActiveTabReloadService
    ) {}

    public sendMessage<T>(message: RuntimeMessage): Observable<T> {
        return this.data$
            .pipe(
                switchMap((tab) => this.tabsService.sendMessage<T>(tab.id!, message))
            );
    }

    public connect<T>(connection: ConnectionEnum): Observable<T> {
        return this.data$
            .pipe(
                switchMap((tab) => this.tabsService.connect<T>(tab.id!, connection))
            );
    }
}
