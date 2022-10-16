import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@extension-env';
import { map } from 'rxjs';
import { StateFullInfoService } from '../../services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    public readonly amountOfDisplayedStates$ = this.stateFullInfoService.data$
        .pipe(
            map((operations) => operations.length)
        );

    public get version(): string {
        return environment.version;
    }

    constructor(
        private readonly stateFullInfoService: StateFullInfoService
    ) {}
}
