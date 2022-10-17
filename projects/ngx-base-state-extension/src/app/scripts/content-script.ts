// Need to avoid index.ts files,
// or investigate how to setup webpack
// to avoid huge bundle sizes while using index.ts files.
import { fromEvent, map, take, ReplaySubject } from 'rxjs';
import { ContentScriptConnectionEnum as ConnectionEnum } from '../core/enums/content-script-connection.enum';
import { RuntimeMessageEnum } from '../core/enums/runtime-message.enum';
import { ɵMetadataOperation } from '../../../../ngx-base-state/src/lib/interfaces/metadata-operation.interface';
import { CustomEventEnum } from './enums/custom-event.enum';

const scrapperScriptName = 'scrapper.js';
const scrapperScriptPath = chrome.runtime.getURL(scrapperScriptName);
// FIXME: Investigate how to pass ReplaySubject from the window to content-script
// Right now here creating another ReplaySubject which contain exact buffer that contain
// ReplaySubject in the window.
const operationEmitterEvent$ = new ReplaySubject<ɵMetadataOperation>();
let isDevtoolsEnabled = false;

initIsDevtoolsEnabledObserver();
initMetadataOperationObserver();

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
    const operationEmitterSubscription = operationEmitterEvent$
        .subscribe((metadataOperation) => port.postMessage(metadataOperation));

    port.onDisconnect
        .addListener(() => operationEmitterSubscription.unsubscribe());
}

function initMetadataOperationObserver(): void {
    fromEvent<CustomEvent<ɵMetadataOperation>>(document, CustomEventEnum.MetadataOperation)
        .pipe(map((event) => event.detail))
        .subscribe((metadataOperation) => operationEmitterEvent$.next(metadataOperation));
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
