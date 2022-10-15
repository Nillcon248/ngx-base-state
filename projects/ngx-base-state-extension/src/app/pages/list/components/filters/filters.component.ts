import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OPERATION_TYPE_MAP } from '@extension-data';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';
import { MetadataListFiltersService } from '../../services';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
    public readonly operationTypeArray = [...OPERATION_TYPE_MAP.values()];
    public readonly filters$ = this.filtersService.data$;

    constructor(
        private readonly filtersService: MetadataListFiltersService
    ) {}

    public onSearchChange(event: Event): void {
        const inputElement = event.target as HTMLInputElement;

        this.filtersService.update({ searchString: inputElement.value });
    }

    public onOperationSelectValueChange(operationId: ɵMetadataOperationTypeEnum | null): void {
        this.filtersService.update({ operationType: operationId });
    }
}
