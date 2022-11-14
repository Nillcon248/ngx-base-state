import { Injectable } from '@angular/core';
import { MetadataOperation } from '@extension/interfaces';
import { map, Observable, shareReplay } from 'rxjs';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class RealtimeMetadataService {
    public readonly data$: Observable<Record<number, MetadataOperation>>;
    public readonly dataAsArray$: Observable<MetadataOperation[]>;

    constructor(
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {
        this.data$ = this.createDataObservable();
        this.dataAsArray$ = this.createDataAsArrayObservable(this.data$);
    }

    public getWithinClassId(classId: number): Observable<MetadataOperation> {
        return this.data$
            .pipe(
                map((operationRecord) => operationRecord[classId]!)
            );
    }

    private createDataObservable(): Observable<Record<number, MetadataOperation>> {
        return this.operationHistoryState.data$
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
    }

    private createDataAsArrayObservable(
        originalData$: Observable<Record<number, MetadataOperation>>
    ): Observable<MetadataOperation[]> {
        return originalData$
            .pipe(
                map((metadataRecord) => Object.values(metadataRecord))
            );
    }
}
