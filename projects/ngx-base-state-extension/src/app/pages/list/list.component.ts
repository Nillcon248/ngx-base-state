import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';
import { AppRouteEnum } from '../../core';
import { StateFullInfo } from './interfaces';
import { MetadataListFiltersState } from './states';
import {
    StateFullInfoService,
    MetadataListFiltersService
} from './services';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MetadataListFiltersState,
        StateFullInfoService,
        MetadataListFiltersService
    ]
})
export class ListComponent {
    public readonly stateFullInfoArray$ = this.stateFullInfoService.data$;

    constructor(
        private readonly stateFullInfoService: StateFullInfoService,
        private readonly router: Router
    ) {}

    public onListItemClick(classId: number): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Details}/${classId}`);
    }

    public getListItemCssClass({ operation }: StateFullInfo): string {
        return (operation.type === ɵMetadataOperationTypeEnum.Destroy) ? 'destroyed' : '';
    }

    public trackByFn(itemIndex: number, stateFullInfo: StateFullInfo): string {
        return stateFullInfo.operation.className;
    }
}
