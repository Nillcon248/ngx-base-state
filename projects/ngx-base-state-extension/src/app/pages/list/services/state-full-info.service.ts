import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/interfaces';
import { DataTypeService, MetadataService } from '@extension-services';
import { StateDataTypeEnum } from '@extension-core';
import { Filters, StateFullInfo } from '../interfaces';
import { StateDataType } from '../../../interfaces';
import { DATA_TYPE_MAP } from '../../../data';
import { MetadataListFiltersState } from '../states';

@Injectable()
export class StateFullInfoService {
    public readonly data$ = combineLatest([
        this.metadataService.dataAsArray$,
        this.dataTypeService.data$,
        this.filtersState.data$
    ])
        .pipe(
            map(([metadata, dataTypeMap, filters]) => ({
                stateFullInfoArray: this.adaptMetadata(metadata, dataTypeMap),
                filters
            })),
            map(({ stateFullInfoArray, filters }) => this.filterOperations(filters!, stateFullInfoArray)),
            shareReplay(1)
        );

    constructor(
        private readonly metadataService: MetadataService,
        private readonly dataTypeService: DataTypeService,
        private readonly filtersState: MetadataListFiltersState
    ) {}

    private adaptMetadata(
        operations: ɵMetadataOperation[],
        dataTypeMap: Map<number, StateDataTypeEnum>
    ): StateFullInfo[] {
        return operations
            .map((operation) => {
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

    private filterOperations(filters: Filters, stateFullInfoArray: StateFullInfo[]): StateFullInfo[] {
        const searchString = filters.searchString.toLowerCase();

        return stateFullInfoArray
            .filter((stateFullInfo) => {
                return (
                    (
                        stateFullInfo.operation.className.toLowerCase().includes(searchString) ||
                        stateFullInfo.operation.classContext?.toLowerCase().includes(searchString)
                    ) &&
                    ((filters.dataType) ? (stateFullInfo.dataType.id === filters.dataType) : true)
                );
            })
            .sort(filters.sortBy.compareFn);
    }
}
