import { Injectable } from '@angular/core';
import { ArrayState } from '@ngx-base-state';

@Injectable()
export class VideosState extends ArrayState<unknown> {
    constructor() {
        super(null);
    }
}
