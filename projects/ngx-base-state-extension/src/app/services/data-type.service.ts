import { Injectable } from '@angular/core';
import { NgxBaseStateDevtoolsMetadata as Metadata } from '@ngx-base-state/interfaces';
import { StateDataTypeEnum } from '@extension-core';
import { Observable, share, map } from 'rxjs';
import { MetadataState } from '../states';
import { DataTypeAdapter } from '../adapters';

@Injectable({
    providedIn: 'root'
})
export class DataTypeService {
    public readonly data$: Observable<Map<string, StateDataTypeEnum>> = this.metadataState.data$
        .pipe(
            map((metadata) => this.dataTypeAdapter.adapt(metadata as Metadata)),
            share()
        );

    constructor(
        private readonly dataTypeAdapter: DataTypeAdapter,
        private readonly metadataState: MetadataState
    ) {}
}
