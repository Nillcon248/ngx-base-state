import { Injectable } from '@angular/core';
import { NgxState, RecordState } from '@ngx-base-state';
import { DataType } from '../classes';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DataTypeState extends RecordState<string, DataType> {
    constructor() {
        super({});
    }

    public registerIfAbsent(dataTypeName: string): void {
        if (!this.data![dataTypeName]) {
            const dataType = new DataType(dataTypeName);

            this.setItem(dataTypeName, dataType);
        }
    }
}
