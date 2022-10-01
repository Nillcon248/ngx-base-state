import { fromEvent, takeUntil, Observable, startWith, map } from 'rxjs';
import { METADATA_INPUT_ELEMENT_ID } from './consts';

const scrapperScriptName = 'scrapper.js';
const scrapperScriptPath = chrome.extension.getURL(scrapperScriptName);
let metadataInputElement: HTMLInputElement;

chrome.runtime.onConnect.addListener((port) => {
    const portDisconnect$ = new Observable((subscriber) => {
        port.onDisconnect.addListener(() => {
            subscriber.next();
            subscriber.complete();
        });
    });

    fromEvent(metadataInputElement, 'change')
        .pipe(
            map((event) => event.target as HTMLInputElement),
            map((targetElement) => targetElement.value),
            startWith(metadataInputElement.value),
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

function injectScrapperScript(): void {
    const scriptElement = injectScript(scrapperScriptPath);

    scriptElement.addEventListener('load', () => {
        metadataInputElement = document
            .getElementById(METADATA_INPUT_ELEMENT_ID) as HTMLInputElement;
    });
}

injectScrapperScript();
