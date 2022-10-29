import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/extension/src/app/shared';
import { ActionButtonsComponent } from './action-buttons.component';
import { StacktraceButtonComponent } from './stacktrace-button';
import { ValuePreviewerExpansionButtonComponent } from './value-previewer-expansion-button';

@NgModule({
    declarations: [
        ActionButtonsComponent,
        StacktraceButtonComponent,
        ValuePreviewerExpansionButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ActionButtonsComponent
    ]
})
export class ActionButtonsModule {}
