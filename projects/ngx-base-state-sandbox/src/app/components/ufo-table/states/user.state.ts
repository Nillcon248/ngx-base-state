import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from '@ngx-base-state';

@NgxState()
@Injectable()
export class UserState extends ObjectState<unknown> {
    constructor() {
        super(
            { name: 'I am second user state' },
            { context: 'from ufo-table' }
        );
    }
}
