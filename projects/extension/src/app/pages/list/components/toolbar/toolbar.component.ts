import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'projects/extension/src/environments/environment';
import { map } from 'rxjs';
import { FilteredOperationsService } from '../../services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    public readonly amountOfDisplayedStates$ = this.filteredOperationsState.data$
        .pipe(
            map((operations) => operations.length)
        );

    public get version(): string {
        return environment.version;
    }

    constructor(
        private readonly filteredOperationsState: FilteredOperationsService
    ) {}
}
