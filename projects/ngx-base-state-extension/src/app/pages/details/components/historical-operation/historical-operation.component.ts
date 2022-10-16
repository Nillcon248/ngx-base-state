import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ɵMetadataOperation } from '@ngx-base-state/classes';

@Component({
    selector: 'app-historical-operation',
    templateUrl: './historical-operation.component.html',
    styleUrls: ['./historical-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalOperationComponent {
    @Input()
    public operation!: ɵMetadataOperation;
}
