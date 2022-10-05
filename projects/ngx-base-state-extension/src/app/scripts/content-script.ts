import { fromEvent, takeUntil, Observable, map, ReplaySubject, share } from 'rxjs';
import { METADATA_CHANGE_EVENT } from './consts';

const scrapperScriptName = 'scrapper.js';
const scrapperScriptPath = chrome.extension.getURL(scrapperScriptName);
const metadataChangeEvent$ = new ReplaySubject<CustomEvent>(1);

fromEvent<CustomEvent>(document, METADATA_CHANGE_EVENT)
    .subscribe((event) => metadataChangeEvent$.next(event));

chrome.runtime.onConnect.addListener((port) => {
    const portDisconnect$ = new Observable((subscriber) => {
        port.onDisconnect.addListener(() => {
            subscriber.next();
            subscriber.complete();
        });
    });

    metadataChangeEvent$
        .pipe(
            map((event) => event.detail),
            takeUntil(portDisconnect$)
        )
        .subscribe((metadata) => port.postMessage(metadata));
});

function injectScript(filePath: string): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = filePath;

    document.body.appendChild(scriptElement);

    return scriptElement;
}

injectScript(scrapperScriptPath);
