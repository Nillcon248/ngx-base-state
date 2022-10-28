import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MetadataOperation } from '@extension-interfaces';
import { StacktraceBottomSheetComponent } from '../../stacktrace-bottom-sheet';

@Component({
    selector: 'app-stacktrace-button',
    templateUrl: './stacktrace-button.component.html',
    styleUrls: ['./stacktrace-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StacktraceButtonComponent {
    @Input()
    public operation!: MetadataOperation;

    constructor(
        private readonly bottomSheetService: MatBottomSheet
    ) {}

    public onClick(): void {
        this.bottomSheetService.open(StacktraceBottomSheetComponent, {
            data: this.operation
        });
    }
}
