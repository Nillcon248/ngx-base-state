import { Injectable } from '@angular/core';
import { BaseEmitter } from '@extension-core';
import { MetadataOperation } from '@extension-interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationEmitter extends BaseEmitter<MetadataOperation> {}
