import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from 'projects/extension/src/app/core';
import { MetadataService } from 'projects/extension/src/app/services';
import { OPENED_CLASS_ID } from '../../consts';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
    public readonly lastOperation$ = this.metadataService.getWithinClassId(this.openedClassId);

    constructor(
        @Inject(OPENED_CLASS_ID) private readonly openedClassId: number,
        private readonly metadataService: MetadataService,
        private readonly router: Router
    ) {}

    public onBackButtonClick(): void {
        this.router.navigateByUrl(`/${AppRouteEnum.List}`);
    }
}
