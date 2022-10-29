import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe-decorator';
import { MetadataOperation } from 'projects/extension/src/app/interfaces';
import { ApplicationReloadService } from 'projects/extension/src/app/services';
import { Subscription } from 'rxjs';

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
