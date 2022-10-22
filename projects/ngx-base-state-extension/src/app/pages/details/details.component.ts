import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { ApplicationReloadService } from '@extension-services';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { OPENED_CLASS_NAME_PROVIDER } from './consts';
import { TimelineItemTypeEnum } from './enums';
import { SelectedTimelineItemState } from './states';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@extension-core';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OPENED_CLASS_NAME_PROVIDER,
        SelectedTimelineItemState
    ]
})
export class DetailsComponent implements OnInit {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;
    public readonly selectedTimelineItem$ = this.selectedTimelineItemState.data$;

    constructor(
        private readonly router: Router,
        private readonly applicationReloadService: ApplicationReloadService,
        private readonly selectedTimelineItemState: SelectedTimelineItemState
    ) {}

    public ngOnInit(): void {
        this.initApplicationReloadObserver();
    }

    @AutoUnsubscribe()
    private initApplicationReloadObserver(): Subscription {
        return this.applicationReloadService.onReload$
            .pipe(finalize(() => console.log('final')))
            .subscribe(() => this.router.navigateByUrl(`/${AppRouteEnum.List}`));
    }
}
