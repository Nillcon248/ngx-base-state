import { Injectable } from '@angular/core';
import { PrimitiveState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class UserAuthorizationState extends PrimitiveState<boolean> {
    constructor() {
        super(true);
    }
}
