import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoCreationForm } from '../../classes';

@Component({
    selector: 'app-todo-creation-form',
    templateUrl: './todo-creation-form.component.html',
    styleUrls: ['./todo-creation-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreationFormComponent {
    @Input()
    public formGroup!: TodoCreationForm;
}
