import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MetadataListFiltersState, SelectedOperationItemViewTabIndexState } from './states';
import { StateFullInfoService, StateFullInfoFilteringService } from './services';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MetadataListFiltersState,
        StateFullInfoService,
        StateFullInfoFilteringService
    ]
})
export class ListComponent {
    public readonly selectedTabIndex$ = this.selectedOperationItemViewTabIndexState.data$;
    
    constructor(
        private readonly selectedOperationItemViewTabIndexState: SelectedOperationItemViewTabIndexState,
    ) {}

    public onOperationItemViewTabClick(operationItemViewTabIndex: number): void {
        this.selectedOperationItemViewTabIndexState.set(operationItemViewTabIndex);
    }
}
