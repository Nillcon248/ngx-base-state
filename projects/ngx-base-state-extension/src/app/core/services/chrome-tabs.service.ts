import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { RuntimeMessage } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChromeTabsService {
    constructor(
        private readonly ngZone: NgZone
    ) {}

    public watchForActive(): Observable<chrome.tabs.Tab> {
        return new Observable((subscriber) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                this.ngZone.run(() => subscriber.next(tabs[0]));
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
}
