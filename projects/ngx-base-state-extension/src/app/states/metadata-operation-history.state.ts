import { Injectable } from '@angular/core';
import { BaseState, NgxState } from '@ngx-base-state';
import { MetadataOperation } from '@extension-interfaces';

/** Map contain key as `classId` */
@NgxState()
@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryState extends BaseState<Map<number, MetadataOperation[]>> {
    private readonly maxOperationAmount = 10;

    constructor() {
        super(new Map());
    }

    public pushWithinClassId(classId: number, operation: MetadataOperation): void {
        const data = new Map(this.data);

        if (!data.has(classId)) {
            data.set(classId, []);
        }

        const lastOperations = this.getLastOperationsWithinClassId(classId);
        const updatedOperations = [operation, ...lastOperations];

        data.set(classId, updatedOperations);
        this.set(data);
    }

    private getLastOperationsWithinClassId(classId: number): MetadataOperation[] {
        const operations = this.data!.get(classId) ?? [];

        return operations.slice(0, this.maxOperationAmount);
    }
}
