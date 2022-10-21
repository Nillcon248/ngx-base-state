import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from '@ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class SelectedOperationItemViewTabIndexState extends PrimitiveState<number> {
    constructor() {
        super(0);
    }
}
