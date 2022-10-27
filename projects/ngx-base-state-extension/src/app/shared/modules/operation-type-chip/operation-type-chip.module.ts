import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OperationTypeChipComponent } from './operation-type-chip.component';

@NgModule({
    declarations: [
        OperationTypeChipComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OperationTypeChipComponent
    ]
})
export class OperationTypeChipModule {}
