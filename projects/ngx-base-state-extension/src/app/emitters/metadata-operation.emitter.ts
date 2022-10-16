import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationEmitter {
    public get data$(): Observable<ɵMetadataOperation> {
        return this._emitter$.asObservable();
    }

    private readonly _emitter$ = new Subject<ɵMetadataOperation>();

    public emit(operation: ɵMetadataOperation): void {
        this._emitter$.next(operation);
    }
}
