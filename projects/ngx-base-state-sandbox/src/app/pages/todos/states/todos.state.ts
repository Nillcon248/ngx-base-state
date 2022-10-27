import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from '@ngx-base-state';
import { Todo } from '../interfaces';

@NgxState()
@Injectable()
export class TodosState extends ArrayState<Todo> {
    constructor() {
        super([]);
    }

    protected override getItemId(todo: Todo): number {
        return todo.id;
    }
}
