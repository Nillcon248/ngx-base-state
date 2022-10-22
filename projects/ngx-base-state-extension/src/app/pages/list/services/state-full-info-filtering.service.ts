import { Injectable } from '@angular/core';
import { StateDataTypeEnum } from '@extension-enums';
import { Filters, StateFullInfo } from '../interfaces';

@Injectable()
export class StateFullInfoFilteringService {
    public process(stateFullInfoArray: StateFullInfo[], filters: Filters): StateFullInfo[] {
        const searchString = filters.searchString.toLowerCase();

        return stateFullInfoArray
            .filter((stateFullInfo) => (
                this.filterItemBySearchString(stateFullInfo, searchString) &&
                this.filterItemByDataType(stateFullInfo, filters.dataType)
            ))
            .sort(filters.sortBy.compareFn);
    }

    public filterItemBySearchString(
        stateFullInfo: StateFullInfo,
        searchString: string
    ): boolean {
        return (
            this.isItemClassNameMatchWithSearchString(stateFullInfo, searchString) ||
            this.isItemClassContextMatchWithSearchString(stateFullInfo, searchString)
        );
    }

    private isItemClassNameMatchWithSearchString(
        stateFullInfo: StateFullInfo,
        searchString: string
    ): boolean {
        return stateFullInfo.operation.className
            .toLowerCase()
            .includes(searchString);
    }

    private isItemClassContextMatchWithSearchString(
        stateFullInfo: StateFullInfo,
        searchString: string
    ): boolean {
        if (stateFullInfo.operation.classContext) {
            return stateFullInfo.operation.classContext
                .toLowerCase()
                .includes(searchString);
        }
        
        return false;
    }

    private filterItemByDataType(stateFullInfo: StateFullInfo, dataType: StateDataTypeEnum | null): boolean {
        if (dataType) {
            return (stateFullInfo.dataType.id === dataType);
        }

        return true;
    }
}
