import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from '@ngx-base-state';

@NgxState()
@Injectable()
export class VideosState extends ArrayState<unknown> {
    constructor() {
        super(null);
    }
}
