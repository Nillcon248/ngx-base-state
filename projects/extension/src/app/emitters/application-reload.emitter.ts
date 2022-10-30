import { Injectable } from '@angular/core';
import { BaseEmitter } from '@extension-core';

@Injectable({
    providedIn: 'root'
})
export class ApplicationReloadEmitter extends BaseEmitter<boolean> {}
