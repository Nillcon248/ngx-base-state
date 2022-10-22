import { Injectable } from '@angular/core';
import { combineLatest, debounceTime, map, shareReplay } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state';
import { DataTypeService, MetadataService } from '@extension-services';
import { StateDataTypeEnum } from '@extension-enums';
import { StateFullInfo } from '../interfaces';
import { StateDataType } from '../../../interfaces';
import { DATA_TYPE_MAP } from '../../../data';
import { MetadataListFiltersState } from '../states';
import { StateFullInfoFilteringService } from './state-full-info-filtering.service';

@Injectable()
export class StateFullInfoService {
    public readonly data$ = combineLatest([
        this.metadataService.dataAsArray$,
        this.dataTypeService.data$,
        this.filtersState.data$
    ])
        .pipe(
            // Metadata & DataType change those value together,
            // debounceTime helps to avoid double firing logic below
            debounceTime(0),
            map(([operations, dataTypeMap, filters]) => ({
                data: this.adaptFromOperations(operations, dataTypeMap),
                filters
            })),
            map(({ data, filters }) => this.stateFullInfoFilteringService.process(data, filters!)),
            shareReplay(1)
        );

    constructor(
        private readonly metadataService: MetadataService,
        private readonly dataTypeService: DataTypeService,
        private readonly stateFullInfoFilteringService: StateFullInfoFilteringService,
        private readonly filtersState: MetadataListFiltersState
    ) {}

    private adaptFromOperations(
        operations: ɵMetadataOperation[],
        dataTypeMap: Map<number, StateDataTypeEnum>
    ): StateFullInfo[] {
        return operations.map((operation) => {
            const dataTypeId = dataTypeMap.get(operation.classId)!;

            return <StateFullInfo>{
                operation,
                dataType: this.getDataTypeById(dataTypeId)
            };
        });
    }

    private getDataTypeById(id: StateDataTypeEnum): StateDataType {
        return DATA_TYPE_MAP.get(id) as StateDataType;
    }
}
