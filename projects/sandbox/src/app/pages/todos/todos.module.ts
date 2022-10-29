import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {
    TodoCreationFormComponent,
    TodoCreationWindowComponent,
    TodosListComponent
} from './components';
import { TodosComponent } from './todos.component';
import { TodosRoutingModule } from './todos.routing';

@NgModule({
    declarations: [
        TodosComponent,
        TodoCreationWindowComponent,
        TodoCreationFormComponent,
        TodosListComponent
    ],
    imports: [
        CommonModule,
        TodosRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule
    ]
})
export class TodosModule {}
