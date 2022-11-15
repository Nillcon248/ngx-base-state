import type { Subscription } from 'rxjs';
import { fromEvent, map } from 'rxjs';
import { ContentScriptConnectionEnum, CustomEventEnum } from '../enums';
import { emitCustomEvent } from '../functions';
import { OriginalMetadataOperation } from '../interfaces';

export class MetadataOperationsService {
    private metadataOperationsSubscription: Subscription | undefined;

    public initObserver(): void {
        chrome.runtime.onConnect.addListener((port) => {
            if (port.name === ContentScriptConnectionEnum.Operation) {
                this.initMetadataOperationObserver(port);
                this.initPortDisconnectObserver(port);
                emitCustomEvent(CustomEventEnum.RequestMetadataOperation);
            }
        });
    }

    private initMetadataOperationObserver(port: chrome.runtime.Port): void {
        this.metadataOperationsSubscription = fromEvent<CustomEvent<OriginalMetadataOperation>>(
            document,
            CustomEventEnum.MetadataOperation
        )
            .pipe(map((event) => event.detail))
            .subscribe((metadataOperation) => port.postMessage(metadataOperation));
    }

    private initPortDisconnectObserver(port: chrome.runtime.Port): void {
        port.onDisconnect
            .addListener(() => {
                emitCustomEvent(CustomEventEnum.StopRequestMetadataOperation);
                this.metadataOperationsSubscription?.unsubscribe();
            });
    }
}
