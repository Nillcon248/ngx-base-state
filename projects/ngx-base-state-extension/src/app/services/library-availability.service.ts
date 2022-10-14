import { Injectable } from '@angular/core';
import { ChromeTabsService, RuntimeMessageEnum } from '@extension-core';
import { map, switchMap, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LibraryAvailabilityService {
    constructor(
        private readonly chromeTabsService: ChromeTabsService
    ) {}

    public check(): Observable<boolean> {
        return this.chromeTabsService.watchForActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.sendMessage<boolean>(tabId, { type: RuntimeMessageEnum.RequestIsLibraryAvailable }))
            );
    }
}
