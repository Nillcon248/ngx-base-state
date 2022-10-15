import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { UserState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private readonly state: UserState
    ) {}

    public incrementAge(): void {
        const data = this.state.data as User;

        this.state.set({ ...data, age: (data.age + 1) })
    }
}
