import { Injectable } from '@angular/core';
import { ObjectState } from 'projects/ngx-base-state/src/lib';

@Injectable({
    providedIn: 'root'
})
export class UsersState extends ObjectState<unknown> {
    constructor() {
        super({ name: 'DreyLiky' });
    }
}
