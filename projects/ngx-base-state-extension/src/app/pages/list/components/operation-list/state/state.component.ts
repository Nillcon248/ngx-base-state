import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AppRouteEnum } from '@extension-core';
import { ɵMetadataOperationTypeEnum, ɵMetadataOperation } from '@ngx-base-state';
import { StateFullInfo } from '../../../interfaces';
import { StateFullInfoService } from '../../../services';

@Component({
    selector: 'app-state-list',
    templateUrl: './state.component.html',
    styleUrls: ['./state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateListComponent {
    public readonly stateFullInfoArray$ = this.stateFullInfoService.data$;

    constructor(
        private readonly router: Router,
        private readonly stateFullInfoService: StateFullInfoService
    ) {}

    public onListItemClick(stateClassId: number): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Details}/${stateClassId}`);
    }

    public getListItemClass(operation: ɵMetadataOperation): string {
        return (operation.type === ɵMetadataOperationTypeEnum.Destroy) ? 'destroyed' : '';
    }

    public trackByFn(itemIndex: number, stateFullInfo: StateFullInfo): string {
        return stateFullInfo.operation.className;
    }
}
