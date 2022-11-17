import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input
} from '@angular/core';
import { OPERATION_TYPE_MAP } from '@extension/data';
import { MetadataOperation } from '@extension/interfaces';
import { BaseTimelineItemComponent } from '../base.component';

@Component({
    selector: 'app-historical-timeline-item',
    templateUrl: './historical.component.html',
    styleUrls: ['./historical.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoricalTimelineItemComponent extends BaseTimelineItemComponent {
    @Input()
    public operation!: MetadataOperation;

    @HostBinding('style.--operation-color')
    public get hostCssClasses(): string {
        const operation = OPERATION_TYPE_MAP
            .get(this.operation.type);

        return operation!.color;
    }
}
