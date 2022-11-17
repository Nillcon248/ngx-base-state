import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum, ChromeActiveTabService } from '@extension/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { Subscription } from 'rxjs';
import { OPENED_CLASS_NAME_PROVIDER } from './consts';
import { TimelineItemTypeEnum } from './enums';
import { SelectedTimelineItemState, ValuePreviewerExpansionState } from './states';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        OPENED_CLASS_NAME_PROVIDER,
        SelectedTimelineItemState,
        ValuePreviewerExpansionState
    ]
})
export class DetailsComponent implements OnInit {
    public readonly timelineItemTypeEnum = TimelineItemTypeEnum;
    public readonly selectedTimelineItem$ = this.selectedTimelineItemState.data$;

    constructor(
        private readonly router: Router,
        private readonly chromeTabService: ChromeActiveTabService,
        private readonly selectedTimelineItemState: SelectedTimelineItemState
    ) {}

    public ngOnInit(): void {
        this.initApplicationReloadObserver();
    }

    @AutoUnsubscribe()
    private initApplicationReloadObserver(): Subscription {
        return this.chromeTabService.onReload$
            .subscribe(() => this.router.navigateByUrl(`/${AppRouteEnum.List}`));
    }
}
