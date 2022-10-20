import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from '@ngx-base-state';

@NgxState()
@Injectable({
    providedIn: 'root'
})
export class ShortVideosState extends ArrayState<unknown> {
    constructor() {
        super(undefined);
    }
}
