import { Injectable } from '@angular/core';
import { ɵMetadataOperation } from '@ngx-base-state';
import { BaseEmitter } from '@extension-core';

@Injectable({
    providedIn: 'root'
})
export class MetadataOperationEmitter extends BaseEmitter<ɵMetadataOperation> {}
