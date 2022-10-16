import { Injectable } from '@angular/core';
import { BaseState } from '@ngx-base-state';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';

/** Map contain key as `classId` */
@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryState extends BaseState<Map<number, ɵMetadataOperation[]>> {
    private readonly maxOperationAmount = 10;

    constructor() {
        super(new Map());
    }

    public pushWithinClassId(classId: number, operation: ɵMetadataOperation): void {
        const data = new Map(this.data);

        if (!data.has(classId)) {
            data.set(classId, []);
        }

        const lastOperations = this.getLastOperationsWithinClassId(classId);
        const updatedOperations = [...lastOperations, operation];

        data.set(classId, updatedOperations);
        this.set(data);
    }

    private getLastOperationsWithinClassId(classId: number): ɵMetadataOperation[] {
        const operations = this.data!.get(classId) ?? [];
        const isArrayExceedsMaxAmount = (operations.length >= this.maxOperationAmount);
        const amountOfOperationFromStart = (isArrayExceedsMaxAmount) ?
            (operations.length - this.maxOperationAmount) : 0;

        return operations.slice(amountOfOperationFromStart);
    }
}
