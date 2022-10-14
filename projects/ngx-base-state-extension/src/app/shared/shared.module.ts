import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { ValueViewerComponent, TitleComponent } from './components';

@NgModule({
    declarations: [
        ValueViewerComponent,
        TitleComponent
    ],
    imports: [
        CommonModule,
        NgxJsonViewerModule
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatChipsModule,
        
        ValueViewerComponent,
        TitleComponent
    ]
})
export class SharedModule {}
