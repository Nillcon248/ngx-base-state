import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@extension-environment';
import { map, Observable } from 'rxjs';
import { FilteredOperationsService } from '../../services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    public readonly amountOfDisplayedStates$: Observable<number>;

    public get version(): string {
        return environment.version;
    }

    constructor(
        private readonly filteredOperationsState: FilteredOperationsService
    ) {
        this.amountOfDisplayedStates$ = this.createAmountOfDisplayedStatesObservable();
    }

    private createAmountOfDisplayedStatesObservable(): Observable<number> {
        return this.filteredOperationsState.data$
            .pipe(
                map((operations) => operations.length)
            );
    }
}
