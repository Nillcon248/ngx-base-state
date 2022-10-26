import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { BaseState, NgxState } from '@ngx-base-state';
import { DataType } from '../classes';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class DataTypeState extends BaseState<Map<string, DataType>> {
    public readonly dataAsArray$ = this.data$
        .pipe(
            map((dataMap) => [...dataMap!.values()]),
            shareReplay(1)
        );

    constructor() {
        super(new Map());
    }

    public registerIfAbsent(dataTypeName: string): void {
        if (!this.data!.has(dataTypeName)) {
            const data = new Map(this.data);
            const dataType = new DataType(dataTypeName);

            data.set(dataTypeName, dataType);
            this.set(data);
        }
    }
}
