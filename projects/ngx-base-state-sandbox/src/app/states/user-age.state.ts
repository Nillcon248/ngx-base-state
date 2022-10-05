import { Injectable } from '@angular/core';
import { PrimitiveState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class UserAgeState extends PrimitiveState<number> {
    constructor() {
        super(23);
    }
}
