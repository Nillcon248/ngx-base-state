import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { ValuePreviewerExpansionState } from '../../../states';

@Component({
    selector: 'app-value-previewer-expansion-button',
    templateUrl: './value-previewer-expansion-button.component.html',
    styleUrls: ['./value-previewer-expansion-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValuePreviewerExpansionButtonComponent {
    public readonly color$ = this.valuePreviewerExpansionState.data$
        .pipe(
            map((isExpanded) => (isExpanded) ? 'primary' : null)
        );

    constructor(
        private readonly valuePreviewerExpansionState: ValuePreviewerExpansionState
    ) {}

    public onClick(): void {
        this.valuePreviewerExpansionState.toggle();
    }
}
