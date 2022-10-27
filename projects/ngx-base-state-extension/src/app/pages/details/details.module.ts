import { NgModule } from '@angular/core';
import { ValueViewerModule } from '@extension-shared';
import { SharedModule } from '../../shared';
import {
    HistoricalOperationComponent,
    HistoricalTimelineItemComponent,
    RealtimeOperationComponent,
    RealtimeTimelineItemComponent,
    StacktraceBottomSheetComponent,
    StacktraceButtonComponent,
    TimelineComponent,
    ToolbarComponent
} from './components';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing';

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
        ValueViewerModule,
        DetailsRoutingModule
    ]
})
export class DetailsModule {}
