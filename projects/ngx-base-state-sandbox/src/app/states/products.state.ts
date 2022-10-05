import { Injectable } from '@angular/core';
import { ArrayState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class ProductsState extends ArrayState<unknown> {
    constructor() {
        super([
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' }
        ]);
    }
}
