import { Injectable } from '@angular/core';
import { ChromeTabsService, RuntimeMessageEnum } from 'projects/extension/src/app/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LibraryAvailabilityService {
    constructor(
        private readonly chromeTabsService: ChromeTabsService
    ) {}

    public check(): Observable<boolean> {
        return this.chromeTabsService.getActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.sendMessage<boolean>(tabId, { type: RuntimeMessageEnum.RequestIsLibraryAvailable }))
            );
    }
}
