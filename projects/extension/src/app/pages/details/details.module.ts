import { NgModule } from '@angular/core';
import { ValueViewerModule } from 'projects/extension/src/app/shared';
import { SharedModule } from '../../shared';
import {
    ActionButtonsModule,
    HistoricalOperationComponent,
    HistoricalTimelineItemComponent,
    RealtimeOperationComponent,
    RealtimeTimelineItemComponent,
    StacktraceBottomSheetComponent,
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
        StacktraceBottomSheetComponent
    ],
    imports: [
        SharedModule,
        ValueViewerModule,
        DetailsRoutingModule,
        ActionButtonsModule
    ]
})
export class DetailsModule {}
