import { Injectable } from '@angular/core';
import { DataType } from '@extension/classes';
import { ChromeActiveTabService } from '@extension/core';
import { MetadataOperation, OperationProcessor } from '@extension/interfaces';
import { DataTypeState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class DataTypeService implements OperationProcessor {
    public readonly data$ = this.dataTypeState.values$;

    constructor(
        private readonly chromeTabService: ChromeActiveTabService,
        private readonly dataTypeState: DataTypeState
    ) {
        this.initApplicationReloadObserver();
    }

    public onNewOperation(operation: MetadataOperation): void {
        this.dataTypeState.registerIfAbsent(operation.dataType);
    }

    public getByName(dataTypeName: string): DataType {
        return this.dataTypeState.data![dataTypeName];
    }

    private initApplicationReloadObserver(): void {
        this.chromeTabService.onReload$
            .subscribe(() => this.dataTypeState.restoreInitialData());
    }
}
