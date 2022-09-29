import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuntimeMessage } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ChromeTabsService {
    public watchForActive(): Observable<chrome.tabs.Tab> {
        return new Observable((subscriber) => {
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                subscriber.next(tabs[0]);
            });
        });
    }

    public sendMessage<T>(tabId: number, message: RuntimeMessage): Observable<T> {
        return new Observable((subscriber) => {
            chrome.tabs.sendMessage(tabId, message, {}, (response) => {
                console.log('response', response);
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }
}