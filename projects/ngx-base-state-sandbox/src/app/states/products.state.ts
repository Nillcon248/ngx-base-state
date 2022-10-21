import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class ProductsState extends ArrayState<unknown> {
    constructor() {
        super();

        this.pushItem(1);
    }
}
