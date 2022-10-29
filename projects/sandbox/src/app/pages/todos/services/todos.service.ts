import { Injectable } from '@angular/core';
import { TodosState } from '../states';

@Injectable()
export class TodosService {
    public readonly data$ = this.todosState.data$;

    constructor(
        private readonly todosState: TodosState
    ) {}

    public create(name: string): void {
        this.todosState.pushItem({
            id: Math.random(),
            name,
            date: new Date().toJSON()
        });
    }

    public delete(id: number): void {
        this.todosState.removeItemById(id);
    }
}
