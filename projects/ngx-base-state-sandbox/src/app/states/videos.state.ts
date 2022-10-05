import { Injectable } from '@angular/core';
import { ArrayState } from '@ngx-base-state';

@Injectable({
    providedIn: 'root'
})
export class VideosState extends ArrayState<unknown> {
    constructor() {
        super(null);
    }
}
