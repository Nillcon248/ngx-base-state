import { Injectable } from '@angular/core';
import { TodosState } from '../states';

@Injectable()
export class TodosService {
    public readonly data$ = this.todosState.data$;
        
    constructor(
        private readonly todosState: TodosState
    ) {}

    public create(name: string): void {
        const tst = {
            id: Math.random(),
            name,
            date: new Date().toJSON()
        };
        (tst as any).kek = {
            lol: {
                myField: 'ok',
                myFieldNum: 123,
                azaza: tst
            }
        }

        this.todosState.pushItem(tst);
    }

    public delete(id: number): void {
        this.todosState.removeItemById(id);
    }
}
