import { Injectable } from '@angular/core';
import { BaseState } from '@ngx-base-state';
import { ɵMetadataOperation } from '@ngx-base-state/classes';

/** Map contain key as `className` */
@Injectable({
    providedIn: 'root'
})
export class MetadataOperationHistoryState extends BaseState<Map<string, ɵMetadataOperation[]>> {
    private readonly maxOperationAmount = 10;

    constructor() {
        super(new Map());
    }

    public pushWithinClassName(className: string, operation: ɵMetadataOperation): void {
        const data = new Map(this.data);

        if (!data.has(className)) {
            data.set(className, []);
        }

        const lastOperations = this.getLastOperationsWithinClassName(className);
        const updatedOperations = [...lastOperations, operation];

        data.set(className, updatedOperations);
        this.set(data);
    }

    private getLastOperationsWithinClassName(className: string): ɵMetadataOperation[] {
        const operations = this.data!.get(className) ?? [];
        const isArrayExceedsMaxAmount = (operations.length >= this.maxOperationAmount);
        const amountOfOperationFromStart = (isArrayExceedsMaxAmount) ?
            (operations.length - this.maxOperationAmount) : 0;

        return operations.slice(amountOfOperationFromStart);
    }
}
