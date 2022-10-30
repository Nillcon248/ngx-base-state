import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@extension-core';
import { ApplicationReloadService } from '@extension-services';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
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
