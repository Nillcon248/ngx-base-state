import {
    ContentScriptConnectionEnum,
    CustomRequestEventEnum,
    CustomResponseEventEnum
} from '@shell-browser/enums';
import { emitCustomEvent } from '@shell-browser/functions';
import { OriginalMetadataOperation } from '@shell-browser/interfaces';
import type { Subscription } from 'rxjs';
import { fromEvent, map } from 'rxjs';

export class MetadataOperationsService {
    private metadataOperationsSubscription: Subscription | undefined;

    public initObserver(): void {
        chrome.runtime.onConnect.addListener((port) => {
            if (port.name === ContentScriptConnectionEnum.Operation) {
                this.initMetadataOperationObserver(port);
                this.initPortDisconnectObserver(port);
                emitCustomEvent(CustomRequestEventEnum.MetadataOperation);
            }
        });
    }

    private initMetadataOperationObserver(port: chrome.runtime.Port): void {
        this.metadataOperationsSubscription = fromEvent<CustomEvent<OriginalMetadataOperation>>(
            document,
            CustomResponseEventEnum.MetadataOperation
        )
            .pipe(map((event) => event.detail))
            .subscribe((metadataOperation) => port.postMessage(metadataOperation));
    }

    private initPortDisconnectObserver(port: chrome.runtime.Port): void {
        port.onDisconnect
            .addListener(() => {
                emitCustomEvent(CustomRequestEventEnum.StopReceiveMetadataOperation);
                this.metadataOperationsSubscription?.unsubscribe();
            });
    }
}
