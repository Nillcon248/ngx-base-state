import { Injectable } from '@angular/core';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '@ngx-base-state/interfaces';
import { map, switchMap, share, Observable, BehaviorSubject } from 'rxjs';
import { ChromeTabsService } from '../core';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public get data$(): Observable<Metadata> {
        return this._data$.asObservable();
    }

    private readonly _data$ = new BehaviorSubject<Metadata>({});

    private readonly metadataConnectionName = 'metadata';

    constructor(
        private readonly chromeTabsService: ChromeTabsService
    ) {}

    public initObserver(): void {
        this.chromeTabsService.watchForActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.connect<string>(tabId, this.metadataConnectionName)),
                map<string, Metadata>((rawData) => JSON.parse(rawData)),
                share()
            )
            .subscribe((metadata) => this._data$.next(metadata));
    }
}
