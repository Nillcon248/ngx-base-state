import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';
import { ɵMetadataOperation } from '@ngx-base-state/classes';
import { MetadataService } from '@extension-services';
import { Filters } from '../interfaces';
import { MetadataListFiltersState } from '../states';

@Injectable()
export class FilteredRealtimeOperationsService {
    public readonly data$ = combineLatest([
        this.filtersService.data$,
        this.metadataService.dataAsArray$
    ])
        .pipe(
            map(([filters, operations]) => this.filterOperations(filters!, operations)),
            shareReplay(1)
        );

    constructor(
        private readonly filtersService: MetadataListFiltersState,
        private readonly metadataService: MetadataService
    ) {}

    private filterOperations(filters: Filters, operations: ɵMetadataOperation[]): ɵMetadataOperation[] {
        const searchString = filters.searchString.toLowerCase();
        const selectedOperationTypeId = filters.operationType;

        return operations.filter((operation) => {
            return (
                operation.className.toLowerCase().includes(searchString) &&
                ((selectedOperationTypeId) ? (operation.type === selectedOperationTypeId) : true)
            );
        });
    }
}
