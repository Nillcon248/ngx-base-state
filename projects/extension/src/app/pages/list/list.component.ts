import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilteredOperationsService } from './services';
import { MetadataListFiltersState, SelectedOperationItemViewTabIndexState } from './states';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MetadataListFiltersState,
        FilteredOperationsService
    ]
})
export class ListComponent {
    public readonly selectedTabIndex$ = this.selectedTabIndexState.data$;

    constructor(
        private readonly selectedTabIndexState: SelectedOperationItemViewTabIndexState
    ) {}

    public onOperationItemViewTabClick(operationItemViewTabIndex: number): void {
        this.selectedTabIndexState.set(operationItemViewTabIndex);
    }
}
