import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { FilteredRealtimeOperationsService } from '../../services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    public readonly amountOfDisplayedStates$ = this.filteredOperationsService.data$
        .pipe(
            map((operations) => operations.length)
        );

    constructor(
        private readonly filteredOperationsService: FilteredRealtimeOperationsService
    ) {}
}
