import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ɵMetadataOperationTypeEnum } from '@ngx-base-state/enums';
import { AppRouteEnum } from '../../core';
import { StateShortInfo } from './interfaces';
import { StateShortInfoService } from './services';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        StateShortInfoService
    ]
})
export class ListComponent {
    public readonly stateShortInfoArray$ = this.stateShortInfoService.data$;

    constructor(
        private readonly stateShortInfoService: StateShortInfoService,
        private readonly router: Router
    ) {}

    public onListItemClick(className: string): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Details}/${className}`);
    }

    public getListItemCssClass(shortInfo: StateShortInfo): string {
        return (shortInfo.operationType.id === ɵMetadataOperationTypeEnum.Destroy) ? 'destroyed' : '';
    }

    public trackByFn(itemIndex: number, item: StateShortInfo): string {
        return item.className;
    }
}
