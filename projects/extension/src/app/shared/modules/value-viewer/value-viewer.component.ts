import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isObject, memoize } from '@extension-core';

@Component({
    selector: 'app-value-viewer',
    templateUrl: './value-viewer.component.html',
    styleUrls: ['./value-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueViewerComponent {
    @Input()
    public data: unknown;

    @Input()
    public isExpanded = false;

    @memoize
    public isDataUndefined(data: unknown): boolean {
        return (data === undefined);
    }

    @memoize
    public isDataNull(data: unknown): boolean {
        return (data === null);
    }

    @memoize
    public isDataEmptyObject(data: unknown): boolean {
        return (isObject(data) && !Object.keys(data).length);
    }

    @memoize
    public isDataEmptyArray(data: unknown): boolean {
        return (Array.isArray(data) && !data.length);
    }

    @memoize
    public isDataValidForJsonViewer(data: unknown): boolean {
        return (
            !this.isDataUndefined(data) &&
            !this.isDataNull(data) &&
            !this.isDataEmptyArray(data) &&
            !this.isDataEmptyObject(data)
        );
    }
}
