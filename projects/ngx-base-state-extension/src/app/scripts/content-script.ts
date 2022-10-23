// Need to avoid index.ts files & path aliases,
// or investigate how to setup webpack
// to avoid huge bundle sizes while using index.ts files.
import { fromEvent, map, take, ReplaySubject } from 'rxjs';
import { ɵMetadataOperation } from 'projects/ngx-base-state/src/lib/interfaces/metadata-operation.interface';
import { ContentScriptConnectionEnum as ConnectionEnum } from '../core/enums/content-script-connection.enum';
import { RuntimeMessageEnum } from '../core/enums/runtime-message.enum';
import { CustomEventEnum } from './enums/custom-event.enum';
import { emitCustomEvent } from './functions/emit-custom-event.function';

const scrapperScriptName = 'scrapper.js';
const scrapperScriptPath = chrome.runtime.getURL(scrapperScriptName);
let isDevtoolsEnabled = false;

initIsDevtoolsEnabledObserver();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === RuntimeMessageEnum.RequestIsLibraryAvailable) {
        sendResponse(isDevtoolsEnabled);
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === ConnectionEnum.AppInit) {
        onAppInitConnectionEstablished(port);
    } else if (port.name === ConnectionEnum.Operation) {
        onOperationConnectionEstablished(port);
    }
});

function onAppInitConnectionEstablished(port: chrome.runtime.Port): void {
    port.postMessage(true);
}

function onOperationConnectionEstablished(port: chrome.runtime.Port): void {
    const operationEmitterSubscription = fromEvent<CustomEvent<ɵMetadataOperation>>(
        document,
        CustomEventEnum.MetadataOperation
    )
        .pipe(map((event) => event.detail))
        .subscribe((metadataOperation) => port.postMessage(metadataOperation));

    emitCustomEvent(CustomEventEnum.RequestMetadataOperation);

    port.onDisconnect
        .addListener(() => {
            emitCustomEvent(CustomEventEnum.StopRequestMetadataOperation);
            operationEmitterSubscription.unsubscribe();
        });
}

function initIsDevtoolsEnabledObserver(): void {
    fromEvent<CustomEvent<boolean>>(document, CustomEventEnum.IsDevtoolsEnabled)
        .pipe(take(1))
        .subscribe((event) => (isDevtoolsEnabled = event.detail));
}

function injectScript(filePath: string): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = filePath;

    document.body.appendChild(scriptElement);

    return scriptElement;
}

injectScript(scrapperScriptPath);
