import { NgModule } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { SharedModule } from '@extension-shared';
import { ContentComponent } from './content.component';
import {
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
        ContentComponent,
        TimelineComponent,
        RealtimeTimelineItemComponent,
        HistoricalTimelineItemComponent,
        HistoricalOperationComponent,
        RealtimeOperationComponent,
        StacktraceButtonComponent,
        StacktraceBottomSheetComponent
    ],
    imports: [
        SharedModule,
        NgxJsonViewerModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule {}
