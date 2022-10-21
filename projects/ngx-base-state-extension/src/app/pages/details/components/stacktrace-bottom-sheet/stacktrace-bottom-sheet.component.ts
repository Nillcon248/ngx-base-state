import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ɵMetadataOperation } from '@ngx-base-state';

@Component({
    selector: 'app-stacktrace-bottom-sheet',
    templateUrl: './stacktrace-bottom-sheet.component.html',
    styleUrls: ['./stacktrace-bottom-sheet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StacktraceBottomSheetComponent {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public readonly operation: ɵMetadataOperation
    ) {}
}
