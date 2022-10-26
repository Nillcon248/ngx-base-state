import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MetadataOperation } from '@extension-interfaces';

@Component({
    selector: 'app-historical-operation',
    templateUrl: './historical-operation.component.html',
    styleUrls: ['./historical-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalOperationComponent {
    @Input()
    public operation!: MetadataOperation;
}
