import { Injectable } from '@angular/core';
import { MetadataOperation as Operation } from '@extension-interfaces';
import { RealtimeMetadataService } from '@extension-services';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { Filters } from '../interfaces';
import { MetadataListFiltersState } from '../states';

@Injectable()
export class FilteredOperationsService {
    public readonly data$: Observable<Operation[]>;

    constructor(
        private readonly operationsService: RealtimeMetadataService,
        private readonly filtersState: MetadataListFiltersState
    ) {
        this.data$ = this.createDataObservable();
    }

    private createDataObservable(): Observable<Operation[]> {
        return combineLatest([
            this.operationsService.dataAsArray$,
            this.filtersState.data$
        ])
            .pipe(
                map(([operations, filters]) => this.filter(operations, filters!)),
                shareReplay(1)
            );
    }

    private filter(operations: Operation[], filters: Filters): Operation[] {
        const searchString = filters.searchString.toLowerCase();

        return operations
            .filter((operation) =>
                this.filterItemBySearchString(operation, searchString) &&
                this.filterItemByDataType(operation, filters.dataType)
            )
            .sort(filters.sortBy.compareFn);
    }

    private filterItemByDataType(operation: Operation, dataType: string | null): boolean {
        if (dataType) {
            return (operation.dataType === dataType);
        }

        return true;
    }

    private filterItemBySearchString(operation: Operation, searchString: string): boolean {
        return (
            this.isItemClassNameMatchWithSearchString(operation, searchString) ||
            this.isItemClassContextMatchWithSearchString(operation, searchString)
        );
    }

    private isItemClassNameMatchWithSearchString(
        operation: Operation,
        searchString: string
    ): boolean {
        return operation.className
            .toLowerCase()
            .includes(searchString);
    }

    private isItemClassContextMatchWithSearchString(
        operation: Operation,
        searchString: string
    ): boolean {
        if (operation.classContext) {
            return operation.classContext
                .toLowerCase()
                .includes(searchString);
        }

        return false;
    }
}
