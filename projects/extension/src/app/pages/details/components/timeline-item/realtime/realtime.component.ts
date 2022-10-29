import {
    ChangeDetectionStrategy,
    Component
} from '@angular/core';
import { BaseTimelineItemComponent } from '../base.component';

@Component({
    selector: 'app-realtime-timeline-item',
    templateUrl: './realtime.component.html',
    styleUrls: ['./realtime.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeTimelineItemComponent extends BaseTimelineItemComponent {}
