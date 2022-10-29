import { Injectable, NgZone } from '@angular/core';
import { ContentScriptConnectionEnum } from 'projects/extension/src/app/core/enums';
import { Observable, retry } from 'rxjs';
import { RuntimeMessage } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChromeTabsService {
    constructor(
        private readonly ngZone: NgZone
    ) {}

    public getActive(): Observable<chrome.tabs.Tab> {
        return new Observable((subscriber) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];

                this.ngZone.run(() => {
                    subscriber.next(activeTab);
                    subscriber.complete();
                });
            });
        });
    }

    public sendMessage<T>(tabId: number, message: RuntimeMessage): Observable<T> {
        return new Observable((subscriber) => {
            chrome.tabs.sendMessage(tabId, message, {}, (response) => {
                this.ngZone.run(() => {
                    subscriber.next(response);
                    subscriber.complete();
                });
            });
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public connect<T>(tabId: number, connection: ContentScriptConnectionEnum): Observable<T> {
        return new Observable<T>((subscriber) => {
            const port = chrome.tabs.connect(tabId, {
                name: connection
            });

            port.onMessage.addListener((message) => {
                this.ngZone.run(() => subscriber.next(message));
            });

            port.onDisconnect.addListener(() => {
                this.ngZone.run(() => subscriber.error());
            });

            return {
                unsubscribe: () => {
                    port.disconnect();
                    subscriber.complete();
                }
            };
        }).pipe(
            retry({ delay: 500 })
        );
    }
}
