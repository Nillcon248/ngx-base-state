import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateDataTypeEnum } from '@extension-core';
import { DATA_TYPE_MAP } from '@extension-data';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';
import { SORT_OPERATION_ARRAY } from '../../data';
import { SortOperation } from '../../interfaces';
import { MetadataListFiltersService } from '../../services';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
    public readonly dataTypeArray = [...DATA_TYPE_MAP.values()];
    public readonly sortOperationArray = [...SORT_OPERATION_ARRAY];
    public readonly filters$ = this.filtersService.data$;

    constructor(
        private readonly filtersService: MetadataListFiltersService
    ) {}

    public onSearchChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        this.filtersService.update({ searchString: inputElement.value });
    }

    public onOperationSelectValueChange(dataType: StateDataTypeEnum): void {
        this.filtersService.update({ dataType });
    }

    public onSortBySelectValueChange(sortBy: SortOperation): void {
        this.filtersService.update({ sortBy });
    }
}
