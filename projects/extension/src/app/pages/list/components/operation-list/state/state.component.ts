import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataType } from 'projects/extension/src/app/classes';
import { AppRouteEnum } from 'projects/extension/src/app/core';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { DataTypeService } from 'projects/extension/src/app/services';
import { ɵMetadataOperationTypeEnum } from 'projects/library/src/lib';
import { FilteredOperationsService } from '../../../services';

@Component({
    selector: 'app-state-list',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateListComponent {
    public readonly filteredOperations$ = this.filteredOperationsService.data$;

    constructor(
        private readonly router: Router,
        private readonly filteredOperationsService: FilteredOperationsService,
        private readonly dataTypeService: DataTypeService
    ) {}

    public onListItemClick(stateClassId: number): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Details}/${stateClassId}`);
    }

    public getDataTypeByName(dataTypeName: string): DataType {
        return this.dataTypeService.getByName(dataTypeName);
    }

    public getListItemClass(operation: MetadataOperation): string {
        return (operation.type === ɵMetadataOperationTypeEnum.Destroy) ? 'destroyed' : '';
    }

    public trackByFn(itemIndex: number, operation: MetadataOperation): string {
        return operation.className;
    }
}
