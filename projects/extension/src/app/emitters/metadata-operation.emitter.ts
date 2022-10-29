import { Injectable } from '@angular/core';
import { BaseEmitter } from 'projects/extension/src/app/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationEmitter extends BaseEmitter<MetadataOperation> {}
