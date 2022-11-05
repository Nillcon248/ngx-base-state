import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { map, Observable } from 'rxjs';
import { ValuePreviewerExpansionState } from '../../../states';

@Component({
    selector: 'app-value-previewer-expansion-button',
    templateUrl: './value-previewer-expansion-button.component.html',
    styleUrls: ['./value-previewer-expansion-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValuePreviewerExpansionButtonComponent {
    public readonly color$: Observable<ThemePalette | null>;

    constructor(
        private readonly valuePreviewerExpansionState: ValuePreviewerExpansionState
    ) {
        this.color$ = this.createColorObservable();
    }

    public onClick(): void {
        this.valuePreviewerExpansionState.toggle();
    }

    private createColorObservable(): Observable<ThemePalette | null> {
        return this.valuePreviewerExpansionState.data$
            .pipe(
                map((isExpanded) => (isExpanded) ? 'primary' : null)
            );
    }
}
