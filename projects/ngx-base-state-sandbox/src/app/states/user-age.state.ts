import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from '@ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class UserAgeState extends PrimitiveState<number> {
    constructor() {
        super(23);
    }
}
