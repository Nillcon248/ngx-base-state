import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from '@ngx-base-state';

@NgxState()
@Injectable()
export class UfoState extends ObjectState<unknown> {
    constructor() {
        super({ name: Math.random() });
    }
}
