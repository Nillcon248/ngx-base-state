import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@extension/core';
import { MetadataOperation } from '@extension/interfaces';
import { ActionsService } from '@extension/services';

@Component({
    selector: 'app-action-list',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListComponent {
    public readonly actions$ = this.actionsService.data$;

    constructor(
        private readonly router: Router,
        private readonly actionsService: ActionsService
    ) {}

    public onListItemClick(stateClassId: number): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Details}/${stateClassId}`);
    }

    public trackByFn(itemIndex: number, operation: MetadataOperation): string {
        return operation.className;
    }
}
