import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'projects/library/src/lib';
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
