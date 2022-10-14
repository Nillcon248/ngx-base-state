import { Injectable } from '@angular/core';
import { BaseState } from '@ngx-base-state';
import { StateDataTypeEnum } from '@extension-core';

/** Map contain key as `className` */
@Injectable({
    providedIn: 'root'
})
export class DataTypeState extends BaseState<Map<string, StateDataTypeEnum>> {
    constructor() {
        super(new Map());
    }

    public setWithinClassName(className: string, dataType: StateDataTypeEnum): void {
        const data = new Map(this.data);

        data.set(className, dataType);
        this.set(data);
    }
}
