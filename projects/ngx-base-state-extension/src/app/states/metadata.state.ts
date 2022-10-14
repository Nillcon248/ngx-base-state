import { Injectable } from '@angular/core';
import { BaseState } from '@ngx-base-state';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';

/** Map contain key as `className` and value as data of the state */
@Injectable({
    providedIn: 'root'
})
export class MetadataState extends BaseState<Map<string, unknown>> {
    constructor() {
        super(new Map());
    }

    public updateByOperation(operation: ɵMetadataOperation): void {
        const metadata = new Map(this.data);

        if (operation.type === ɵMetadataOperationTypeEnum.Destroy) {
            metadata.delete(operation.className);
        } else {
            metadata.set(operation.className, operation.data);
        }

        this.set(metadata);
    }
}
