import { Injectable } from '@angular/core';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '@ngx-base-state/interfaces';
import { map, switchMap, Observable } from 'rxjs';
import { ChromeTabsService } from '../core';
import { MetadataState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$ = this.metadataState.data$ as Observable<Metadata>;

    private readonly metadataConnectionName = 'metadata';

    constructor(
        private readonly chromeTabsService: ChromeTabsService,
        private readonly metadataState: MetadataState
    ) {}

    public initObserver(): void {
        this.chromeTabsService.watchForActive()
            .pipe(
                map((tab) => tab.id as number),
                switchMap((tabId) => this.chromeTabsService.connect<Metadata>(tabId, this.metadataConnectionName))
            )
            .subscribe((metadata) => this.metadataState.set(metadata));
    }
}
