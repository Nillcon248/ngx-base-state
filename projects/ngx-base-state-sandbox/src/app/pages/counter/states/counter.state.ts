import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from '@ngx-base-state';

@NgxState()
@Injectable()
export class CounterState extends PrimitiveState<number> {
    constructor() {
        super(0);
    }

    public increment(): void {
        const newData = (this.data! + 1);

        this.set(newData);
    }

    public decrement(): void {
        const newData = (this.data! - 1);

        this.set(newData);
    }
}
