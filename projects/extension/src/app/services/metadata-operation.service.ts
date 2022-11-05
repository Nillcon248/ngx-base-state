import { Injectable } from '@angular/core';
import { MetadataOperation } from '@extension-interfaces';
import { Observable } from 'rxjs';
import {
    ChromeActiveTabService,
    ContentScriptConnectionEnum as ConnectionEnum
} from '../core';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationService {
    constructor(
        private readonly chromeTabService: ChromeActiveTabService
    ) {}

    public observeOperations(): Observable<MetadataOperation> {
        return this.chromeTabService.connect<MetadataOperation>(ConnectionEnum.Operation);
    }
}
