import { Injectable } from '@angular/core';
import { map, shareReplay, Observable } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$: Observable<Map<number, ɵMetadataOperation>> = this.operationHistoryState.data$
        .pipe(
            map((historyMap) => {
                const metadataMap = new Map<number, ɵMetadataOperation>();

                historyMap!.forEach((operations, classId) => {
                    metadataMap.set(classId, operations[operations.length - 1]);
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

    public getWithinClassId(classId: number): Observable<ɵMetadataOperation> {
        return this.data$
            .pipe(
                map((operationMap) => operationMap.get(classId)!)
            );
    }
}
