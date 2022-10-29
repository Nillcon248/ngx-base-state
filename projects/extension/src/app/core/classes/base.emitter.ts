import { Observable, Subject } from 'rxjs';

export abstract class BaseEmitter<T = unknown> {
    public get data$(): Observable<T> {
        return this._emitter$.asObservable();
    }

    private readonly _emitter$ = new Subject<T>();

    public emit(data: T): void {
        this._emitter$.next(data);
    }
}
