import { Injectable } from '@angular/core';
import { DataTypeState } from '../states';
import { ApplicationReloadEmitter, MetadataOperationEmitter } from '../emitters';
import { DataType } from '../classes';

@Injectable({
    providedIn: 'root'
})
export class DataTypeService {
    public readonly data$ = this.dataTypeState.dataAsArray$;

    constructor(
        private readonly applicationReloadEmitter: ApplicationReloadEmitter,
        private readonly metadataOperationEmitter: MetadataOperationEmitter,
        private readonly dataTypeState: DataTypeState
    ) {
        this.initApplicationReloadObserver();
    }

    public getByName(dataTypeName: string): DataType {
        return this.dataTypeState.data!.get(dataTypeName)!;
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
