import { Injectable } from '@angular/core';
import { PrimitiveState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class UserNameState extends PrimitiveState<string> {
    constructor() {
        super('Viacheslav');
    }
}
