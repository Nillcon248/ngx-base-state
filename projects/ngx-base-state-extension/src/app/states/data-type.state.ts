import { Injectable } from '@angular/core';
import { BaseState, NgxState } from '@ngx-base-state';
import { StateDataTypeEnum } from '@extension-core';

/** Map contain key as `classId` */
@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DataTypeState extends BaseState<Map<number, StateDataTypeEnum>> {
    constructor() {
        super(new Map());
    }

    public setWithinClassId(classId: number, dataType: StateDataTypeEnum): void {
        const data = new Map(this.data);

        data.set(classId, dataType);
        this.set(data);
    }
}
