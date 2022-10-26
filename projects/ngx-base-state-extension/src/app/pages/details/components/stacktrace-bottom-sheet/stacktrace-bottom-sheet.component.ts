import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { ApplicationReloadService } from '@extension-services';
import { MetadataOperation } from '@extension-interfaces';

@Component({
    selector: 'app-stacktrace-bottom-sheet',
    templateUrl: './stacktrace-bottom-sheet.component.html',
    styleUrls: ['./stacktrace-bottom-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StacktraceBottomSheetComponent implements OnInit {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public readonly operation: MetadataOperation,
        private readonly applicationReloadService: ApplicationReloadService,
        private readonly bottomSheetRef: MatBottomSheetRef
    ) {}

    public ngOnInit(): void {
        this.initApplicationReloadObserver();
    }

    @AutoUnsubscribe()
    private initApplicationReloadObserver(): Subscription {
        return this.applicationReloadService.onReload$
            .subscribe(() => this.bottomSheetRef.dismiss());
    }
}
