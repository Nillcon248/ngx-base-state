import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from 'projects/library/src/lib';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class SelectedOperationItemViewTabIndexState extends PrimitiveState<number> {
    constructor() {
        super(0);
    }
}
