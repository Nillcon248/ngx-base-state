import { Injectable } from '@angular/core';
import { map, switchMap, share, Observable } from 'rxjs';
import { ChromeTabsService, RuntimeMessageEnum } from '../core';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$: Observable<Metadata> = this.chromeTabsService.watchForActive()
        .pipe(
            map((tab) => tab.id as number),
            switchMap((tabId) => this.chromeTabsService.sendMessage<string>(tabId, { type: RuntimeMessageEnum.Metadata })),
            map<string, Metadata>((rawData) => JSON.parse(rawData)),
            share()
        );

    constructor(
        private readonly chromeTabsService: ChromeTabsService
    ) {}
}
