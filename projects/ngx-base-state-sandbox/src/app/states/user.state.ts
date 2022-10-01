import { Injectable } from '@angular/core';
import { ObjectState } from 'projects/ngx-base-state/src/lib';

interface User {
    readonly name: string;
    readonly age: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserState extends ObjectState<User> {
    constructor() {
        super({ name: 'DreyLiky', age: 1 });

        setInterval(() => {
            const data = this.data as User;

            this.setNewValue({ ...data, age: (data.age + 1) })
        }, 1000);
    }
}
