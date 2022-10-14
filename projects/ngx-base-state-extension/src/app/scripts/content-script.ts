import {
    ContentScriptConnectionEnum as ConnectionEnum,
    RuntimeMessage,
    RuntimeMessageEnum
} from '../core';
import { fromEvent, takeUntil, Observable, map, filter, ReplaySubject } from 'rxjs';
import { ɵMetadataOperation } from '../../../../ngx-base-state/src/lib/classes';
import { METADATA_OPERATION_EMITTER_EVENT } from './consts';

const scrapperScriptName = 'scrapper.js';
const scrapperScriptPath = chrome.runtime.getURL(scrapperScriptName);
const operationEmitterEvent$ = new ReplaySubject<ɵMetadataOperation>();
let isScrapperSentCustomEvent = false;

fromEvent<CustomEvent<ɵMetadataOperation>>(document, METADATA_OPERATION_EMITTER_EVENT)
    .pipe(
        map((event) => event.detail)
    )
    .subscribe((metadataOperation) => {
        isScrapperSentCustomEvent = true;

        operationEmitterEvent$.next(metadataOperation);
    });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === RuntimeMessageEnum.RequestIsLibraryAvailable) {
        sendResponse(<RuntimeMessage>{
            type: RuntimeMessageEnum.LibraryAvailability,
            data: isScrapperSentCustomEvent
        });
    }
});

chrome.runtime.onConnect.addListener((port) => {
    const portDisconnect$ = new Observable((subscriber) => {
        port.onDisconnect.addListener(() => {
            subscriber.next();
            subscriber.complete();
        });
    });

    if (port.name === ConnectionEnum.AppInit) {
        port.postMessage(true);
    }

    operationEmitterEvent$
        .pipe(
            filter(() => (port.name === ConnectionEnum.Operation)),
            takeUntil(portDisconnect$)
        )
        .subscribe((metadataOperation) => port.postMessage(metadataOperation));
});

function injectScript(filePath: string): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = filePath;

    document.body.appendChild(scriptElement);

    return scriptElement;
}

injectScript(scrapperScriptPath);
