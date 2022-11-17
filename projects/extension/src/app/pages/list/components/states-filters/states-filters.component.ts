import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataTypeService } from '@extension/services';
import { SORT_OPERATION_ARRAY } from '../../data';
import { SortOperation } from '../../interfaces';
import { MetadataListFiltersState } from '../../states';

@Component({
    selector: 'app-states-filters',
    templateUrl: './states-filters.component.html',
    styleUrls: ['./states-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatesFiltersComponent {
    public readonly dataTypeArray$ = this.dataTypeService.data$;
    public readonly sortOperationArray = [...SORT_OPERATION_ARRAY];
    public readonly filters$ = this.filtersService.data$;

    constructor(
        private readonly dataTypeService: DataTypeService,
        private readonly filtersService: MetadataListFiltersState
    ) {}

    public onSearchChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        this.filtersService.updateWithPartial({ searchString: inputElement.value });
    }

    public onDataTypeSelectValueChange(dataType: string): void {
        this.filtersService.updateWithPartial({ dataType });
    }

    public onSortBySelectValueChange(sortBy: SortOperation): void {
        this.filtersService.updateWithPartial({ sortBy });
    }
}
