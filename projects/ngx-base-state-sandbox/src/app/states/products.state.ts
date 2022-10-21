import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from '@ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class ProductsState extends ArrayState<unknown> {}
