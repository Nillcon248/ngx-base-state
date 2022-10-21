import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import {
    ValueViewerComponent,
    TitleComponent,
    OperationTypeChipComponent
} from './components';
import { HighlightWhenDataChangesDirective } from './directives';

const sharedModules = [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatTabsModule
];

@NgModule({
    declarations: [
        HighlightWhenDataChangesDirective,
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
        HighlightWhenDataChangesDirective,
        ValueViewerComponent,
        TitleComponent,
        OperationTypeChipComponent
    ]
})
export class SharedModule {}
