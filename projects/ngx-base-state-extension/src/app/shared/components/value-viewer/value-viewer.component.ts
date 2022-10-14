import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-value-viewer',
    templateUrl: './value-viewer.component.html',
    styleUrls: ['./value-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueViewerComponent {
    @Input()
    public data: unknown;

    public get isDataUndefined(): boolean {
        return (this.data === undefined);
    }

    public get isDataNull(): boolean {
        return (this.data === null);
    }

    public get isDataValidForJsonViewer(): boolean {
        return (!this.isDataUndefined && !this.isDataNull);
    }
}
