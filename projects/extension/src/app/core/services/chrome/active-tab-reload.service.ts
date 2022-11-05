import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { ContentScriptConnectionEnum as ConnectionEnum } from '../../enums';
import { ChromeTabsService } from './tabs.service';

/** @internal */
@Injectable({
    providedIn: 'root'
})
export class ChromeActiveTabReloadService {
    public get emitter$(): Observable<boolean> {
        return this._emitter$.asObservable();
    }

    private readonly _emitter$ = new Subject<boolean>();

    constructor(
        private readonly tabsService: ChromeTabsService
    ) {
        this.initObserver();
    }

    private initObserver(): void {
        this.tabsService.getActive()
            .pipe(
                switchMap((tab) => this.tabsService.connect(tab.id!, ConnectionEnum.AppInit))
            )
            .subscribe(() => this._emitter$.next(true));
    }
}
