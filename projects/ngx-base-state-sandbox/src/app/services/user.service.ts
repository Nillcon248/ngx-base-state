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
        this.state.incrementAge();
    }
}
