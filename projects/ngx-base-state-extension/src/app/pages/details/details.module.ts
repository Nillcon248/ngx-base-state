import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing';
import { SharedModule } from '../../shared';
import {
    ToolbarComponent,
    HistoricalOperationComponent,
    RealtimeOperationComponent,
    TimelineComponent,
    RealtimeTimelineItemComponent,
    HistoricalTimelineItemComponent,
    StacktraceButtonComponent,
    StacktraceBottomSheetComponent
} from './components';

@NgModule({
    declarations: [
        DetailsComponent,
        ToolbarComponent,
        HistoricalOperationComponent,
        RealtimeOperationComponent,
        TimelineComponent,
        RealtimeTimelineItemComponent,
        HistoricalTimelineItemComponent,
        StacktraceButtonComponent,
        StacktraceBottomSheetComponent
    ],
    imports: [
        SharedModule,
        DetailsRoutingModule
    ]
})
export class DetailsModule {}
