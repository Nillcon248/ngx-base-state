import { FormControl, FormGroup } from '@angular/forms';
import { FormGroupDef } from '@sandbox/core';
import { Todo } from '../interfaces';

export class TodoCreationForm extends FormGroup<FormGroupDef<Partial<Todo>>> {
    constructor() {
        super({
            name: new FormControl('', { nonNullable: true })
        });
    }
}
