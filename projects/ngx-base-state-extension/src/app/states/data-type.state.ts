import { Injectable } from '@angular/core';
import { MapState, NgxState } from '@ngx-base-state';
import { DataType } from '../classes';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DataTypeState extends MapState<string, DataType> {
    constructor() {
        super(new Map());
    }

    public registerIfAbsent(dataTypeName: string): void {
        if (!this.data!.has(dataTypeName)) {
            const dataType = new DataType(dataTypeName);

            this.setItem(dataTypeName, dataType);
        }
    }
}
