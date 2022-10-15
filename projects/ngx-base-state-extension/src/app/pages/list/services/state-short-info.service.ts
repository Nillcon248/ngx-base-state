import { Injectable } from '@angular/core';
import { combineLatest, map, share } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { DataTypeService } from '@extension-services';
import { StateDataTypeEnum } from '@extension-core';
import { StateShortInfo } from '../interfaces';
import { StateDataType } from '../../../interfaces';
import { DATA_TYPE_MAP, OPERATION_TYPE_MAP } from '../../../data';
import { FilteredRealtimeOperationsService } from './filtered-realtime-operations.service';

@Injectable()
export class StateShortInfoService {
    public readonly data$ = combineLatest([
        this.filteredOperationsService.data$,
        this.dataTypeService.data$
    ])
        .pipe(
            map(([metadata, dataTypeMap]) => this.adaptMetadata(metadata, dataTypeMap)),
            share()
        );

    constructor(
        private readonly filteredOperationsService: FilteredRealtimeOperationsService,
        private readonly dataTypeService: DataTypeService
    ) {}

    private adaptMetadata(
        operations: ɵMetadataOperation[],
        dataTypeMap: Map<string, StateDataTypeEnum>
    ): StateShortInfo[] {
        return operations
            .map((operation) => {
                const dataTypeId = dataTypeMap.get(operation.className)!;
                const operationType = OPERATION_TYPE_MAP.get(operation.type)!;

                return {
                    className: operation.className,
                    operationType,
                    dataType: this.getDataTypeById(dataTypeId)
                } as StateShortInfo;
            });
    }

    private getDataTypeById(id: StateDataTypeEnum): StateDataType {
        return DATA_TYPE_MAP.get(id) as StateDataType;
    }
}
