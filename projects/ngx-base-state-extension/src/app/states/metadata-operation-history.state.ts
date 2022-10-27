import { Injectable } from '@angular/core';
import { MapState, NgxState } from '@ngx-base-state';
import { MetadataOperation } from '@extension-interfaces';

/** Map contain key as `classId` */
@NgxState()
@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryState extends MapState<number, MetadataOperation[]> {
    private readonly maxOperationAmount = 10;

    constructor() {
        super(new Map());
    }

    public pushWithinClassId(classId: number, operation: MetadataOperation): void {
        const lastOperations = this.getLastOperationsWithinClassId(classId);
        const updatedOperations = [operation, ...lastOperations];

        this.setItem(classId, updatedOperations);
    }

    private getLastOperationsWithinClassId(classId: number): MetadataOperation[] {
        const operations = this.data!.get(classId) ?? [];

        return operations.slice(0, this.maxOperationAmount);
    }
}
