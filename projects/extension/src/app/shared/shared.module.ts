import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighlightWhenDataChangesDirective } from './directives';
import { OperationTypeChipModule, TitleModule } from './modules';

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
    MatTabsModule,
    TitleModule,
    OperationTypeChipModule
];

@NgModule({
    declarations: [
        HighlightWhenDataChangesDirective
    ],
    imports: [
        ...sharedModules
    ],
    exports: [
        ...sharedModules,
        HighlightWhenDataChangesDirective
    ]
})
export class SharedModule {}
