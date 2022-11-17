import { Injectable } from '@angular/core';
import { ChromeActiveTabService, RuntimeMessageEnum } from '@extension/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LibraryAvailabilityService {
    constructor(
        private readonly chromeTabService: ChromeActiveTabService
    ) {}

    public check(): Observable<boolean> {
        return this.chromeTabService.sendMessage({
            type: RuntimeMessageEnum.RequestIsLibraryAvailable
        });
    }
}
