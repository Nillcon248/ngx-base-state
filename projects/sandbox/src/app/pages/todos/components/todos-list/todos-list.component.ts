import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todo } from '../../interfaces';
import { TodosService } from '../../services';

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrls: ['./todos-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
    public readonly todos$ = this.todosService.data$;

    constructor(
        private readonly todosService: TodosService
    ) {}

    public onTodoDeleteButtonClick(todo: Todo): void {
        this.todosService.delete(todo.id);
    }
}
