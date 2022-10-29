import { Injectable } from '@angular/core';
import { BaseEmitter } from 'projects/extension/src/app/core';

@Injectable({
    providedIn: 'root'
})
export class ApplicationReloadEmitter extends BaseEmitter<boolean> {}
