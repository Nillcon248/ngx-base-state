import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {
    ValueViewerComponent,
    TitleComponent,
    OperationTypeChipComponent
} from './components';

const sharedModules = [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBottomSheetModule
];

@NgModule({
    declarations: [
        ValueViewerComponent,
        TitleComponent,
        OperationTypeChipComponent
    ],
    imports: [
        NgxJsonViewerModule,
        ...sharedModules
    ],
    exports: [
        ...sharedModules,
        ValueViewerComponent,
        TitleComponent,
        OperationTypeChipComponent
    ]
})
export class SharedModule {}
