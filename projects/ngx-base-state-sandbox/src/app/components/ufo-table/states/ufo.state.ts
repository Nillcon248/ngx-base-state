import { Injectable } from '@angular/core';
import { ObjectState } from '@ngx-base-state';

@Injectable()
export class UfoState extends ObjectState<unknown> {
    constructor() {
        super({ name: Math.random() });
    }
}
