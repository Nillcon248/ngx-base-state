import { Injectable } from '@angular/core';
import { map, share, tap, Observable } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { MetadataOperationHistoryState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class MetadataService {
    public readonly data$: Observable<Map<string, ɵMetadataOperation>> = this.operationHistoryState.data$
        .pipe(
            map((historyMap) => {
                const metadataMap = new Map<string, ɵMetadataOperation>();

                historyMap!.forEach((operations, className) => {
                    metadataMap.set(className, operations[operations.length - 1]);
                });

                return metadataMap;
            }),
            share()
        );

    constructor(
        private readonly operationHistoryState: MetadataOperationHistoryState
    ) {}

    public getWithinClass(className: string): Observable<ɵMetadataOperation> {
        return this.data$
            .pipe(
                map((operationMap) => operationMap.get(className)!)
            );
    }
}
