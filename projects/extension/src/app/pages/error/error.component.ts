import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { AppRouteEnum } from 'projects/extension/src/app/core';
import { ApplicationReloadService } from 'projects/extension/src/app/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly applicationReloadService: ApplicationReloadService
    ) {}

    @AutoUnsubscribe()
    public ngOnInit(): Subscription {
        return this.applicationReloadService.onReload$
            .subscribe(() => this.router.navigateByUrl(`/${AppRouteEnum.List}`));
    }
}
