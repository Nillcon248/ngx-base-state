import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ValueViewerComponent } from './value-viewer.component';

@NgModule({
    declarations: [
        ValueViewerComponent
    ],
    imports: [
        CommonModule,
        NgxJsonViewerModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports: [
        ValueViewerComponent
    ]
})
export class ValueViewerModule {}
