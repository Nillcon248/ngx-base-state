import { Injectable } from '@angular/core';
import { DataType } from '../classes';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { DataTypeState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DataTypeService {
    public readonly data$ = this.dataTypeState.values$;

    constructor(
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly metadataOperationEmitter: MetadataOperationEmitter,
        private readonly dataTypeState: DataTypeState
    ) {
        this.initApplicationReloadObserver();
    }

    public getByName(dataTypeName: string): DataType {
        return this.dataTypeState.data![dataTypeName];
    }

    public initObserver(): void {
        this.metadataOperationEmitter.data$
            .subscribe((operation) => this.dataTypeState.registerIfAbsent(operation.dataType));
    }

    private initApplicationReloadObserver(): void {
        this.applicationReloadEmitter.data$
            .subscribe(() => this.dataTypeState.restoreInitialData());
    }
}
