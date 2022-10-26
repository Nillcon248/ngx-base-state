import { Injectable } from '@angular/core';
import { map, shareReplay, Observable } from 'rxjs';
import { MetadataOperation } from '@extension-interfaces';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$: Observable<Map<number, MetadataOperation>> = this.operationHistoryState.data$
        .pipe(
            map((historyMap) => {
                const metadataMap = new Map<number, MetadataOperation>();

                historyMap!.forEach((operations, classId) => {
                    metadataMap.set(classId, operations[0]);
                });

                return metadataMap;
            }),
            shareReplay(1)
        );

    public readonly dataAsArray$ = this.data$
        .pipe(
            map((metadataMap) => [...metadataMap.values()])
        );

    constructor(
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {}

    public getWithinClassId(classId: number): Observable<MetadataOperation> {
        return this.data$
            .pipe(
                map((operationMap) => operationMap.get(classId)!)
            );
    }
}
