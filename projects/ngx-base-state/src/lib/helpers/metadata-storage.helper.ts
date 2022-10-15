import { Injectable } from '@angular/core';
import { ɵMetadataKeyEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class ɵMetadataStorage {
    private get window(): any {
        return window;
    }

    public get<R = unknown>(key: ɵMetadataKeyEnum): R {
        return this.window[key];
    }

    public set<T>(key: ɵMetadataKeyEnum, data: T): void {
        this.window[key] = data;
    }
}
