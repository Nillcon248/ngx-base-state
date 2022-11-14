// FIXME: Refactor
import { fromEvent, map, take } from 'rxjs';
import { ContentScriptConnectionEnum, CustomEventEnum, RuntimeMessageEnum } from './enums';
import { emitCustomEvent } from './functions';
import { OriginalMetadataOperation } from './interfaces';

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
    if (port.name === ContentScriptConnectionEnum.AppInit) {
        onAppInitConnectionEstablished(port);
    } else if (port.name === ContentScriptConnectionEnum.Operation) {
        onOperationConnectionEstablished(port);
    }
});

function onAppInitConnectionEstablished(port: chrome.runtime.Port): void {
    port.postMessage(true);
}

function onOperationConnectionEstablished(port: chrome.runtime.Port): void {
    const operationEmitterSubscription = fromEvent<CustomEvent<OriginalMetadataOperation>>(
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
