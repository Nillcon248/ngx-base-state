import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateDataTypeEnum } from '@extension-enums';
import { DATA_TYPE_MAP } from '@extension-data';
import { SORT_OPERATION_ARRAY } from '../../data';
import { SortOperation } from '../../interfaces';
import { MetadataListFiltersState } from '../../states';

@Component({
    selector: 'app-full-state-info-filters',
    templateUrl: './full-state-info-filters.component.html',
    styleUrls: ['./full-state-info-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullStateInfoFiltersComponent {
    public readonly dataTypeArray = [...DATA_TYPE_MAP.values()];
    public readonly sortOperationArray = [...SORT_OPERATION_ARRAY];
    public readonly filters$ = this.filtersService.data$;

    constructor(
        private readonly filtersService: MetadataListFiltersState
    ) {}

    public onSearchChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        this.filtersService.updateWithPartial({ searchString: inputElement.value });
    }

    public onOperationSelectValueChange(dataType: StateDataTypeEnum): void {
        this.filtersService.updateWithPartial({ dataType });
    }

    public onSortBySelectValueChange(sortBy: SortOperation): void {
        this.filtersService.updateWithPartial({ sortBy });
    }
}
