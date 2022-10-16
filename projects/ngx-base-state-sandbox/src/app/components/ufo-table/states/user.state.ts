import { Injectable } from '@angular/core';
import { ObjectState } from '@ngx-base-state';

@Injectable()
export class UserState extends ObjectState<unknown> {
    constructor() {
        super(
            { name: 'I am second user state' },
            { context: 'from ufo-table' }
        );
    }
}
