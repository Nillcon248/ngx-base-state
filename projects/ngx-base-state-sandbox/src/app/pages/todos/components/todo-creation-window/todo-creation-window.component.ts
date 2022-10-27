import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoCreationForm } from '../../classes';
import { TodosService } from '../../services';

@Component({
    selector: 'app-todo-creation-window',
    templateUrl: './todo-creation-window.component.html',
    styleUrls: ['./todo-creation-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreationWindowComponent {
    public readonly formGroup = new TodoCreationForm();

    constructor(
        private readonly dialogRef: MatDialogRef<unknown>,
        private readonly todosService: TodosService
    ) {}

    public onCreateButtonClick(): void {
        if (this.formGroup.valid) {
            this.todosService.create(this.formGroup.value.name!);
            this.dialogRef.close();
        }
    }
}
