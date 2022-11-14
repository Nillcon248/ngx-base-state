import { Injectable } from '@angular/core';
import { MetadataOperation } from '@extension/interfaces';
import { NgxState, RecordState } from '@ngx-base-state';

/** Record contain key as `classId` */
@NgxState()
@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryState extends RecordState<string, MetadataOperation[]> {
    private readonly maxOperationAmount = 10;

    constructor() {
        super({});
    }

    public pushWithinClassId(classId: number, operation: MetadataOperation): void {
        const classIdAsString = classId.toString();
        const lastOperations = this.getLastOperationsWithinClassId(classId);
        const updatedOperations = [operation, ...lastOperations];

        this.setItem(classIdAsString, updatedOperations);
    }

    private getLastOperationsWithinClassId(classId: number): MetadataOperation[] {
        const operations = this.data![classId] ?? [];

        return operations.slice(0, this.maxOperationAmount);
    }
}
