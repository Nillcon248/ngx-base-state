import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApplicationReloadEmitter {
    public get data$(): Observable<void> {
        return this._emitter$.asObservable();
    }

    private readonly _emitter$ = new Subject<void>();

    public emit(): void {
        this._emitter$.next();
    }
}
