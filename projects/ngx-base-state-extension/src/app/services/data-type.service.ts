import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateDataTypeEnum } from '@extension-enums';
import { DataTypeState } from '../states';
import { DataToTypeAdapter } from '../adapters';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';

@Injectable({
    providedIn: 'root'
})
export class DataTypeService {
    public readonly data$ = this.dataTypeState.data$ as Observable<Map<number, StateDataTypeEnum>>;

    constructor(
        private readonly dataToTypeAdapter: DataToTypeAdapter,
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly metadataOperationEmitter: MetadataOperationEmitter,
        private readonly dataTypeState: DataTypeState
    ) {
        this.initApplicationReloadObserver();
    }

    public initObserver(): void {
        this.metadataOperationEmitter.data$
            .subscribe((operation) => {
                const dataType = this.dataToTypeAdapter.adapt(operation.data);

                this.dataTypeState.setWithinClassId(operation.classId, dataType);
            });
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.dataTypeState.restoreInitialData());
    }
}