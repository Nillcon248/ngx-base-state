import { Injectable } from '@angular/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { map, Observable, shareReplay } from 'rxjs';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$: Observable<Record<number, MetadataOperation>> = this.operationHistoryState.data$
        .pipe(
            map((historyRecord) => {
                const metadataRecord: Record<number, MetadataOperation> = {};

                Object.entries(historyRecord!).forEach(([classId, operations]) => {
                    metadataRecord[classId] = operations[0];
                });

                return metadataRecord;
            }),
            shareReplay(1)
        );

    public readonly dataAsArray$ = this.data$
        .pipe(
            map((metadataRecord) => Object.values(metadataRecord))
        );

    constructor(
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {}

    public getWithinClassId(classId: number): Observable<MetadataOperation> {
        return this.data$
            .pipe(
                map((operationRecord) => operationRecord[classId]!)
            );
    }
}
