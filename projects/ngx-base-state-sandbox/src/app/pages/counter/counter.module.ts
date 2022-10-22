import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CounterComponent } from './counter.component';
import { CounterRoutingModule } from './counter.routing';

@NgModule({
    declarations: [
        CounterComponent
    ],
    imports: [
        CommonModule,
        CounterRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class CounterModule {}
