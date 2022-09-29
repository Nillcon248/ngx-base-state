import { Component } from '@angular/core';
import { UsersState } from './states/users.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-base-state-sandbox';

  constructor(
    private readonly usersState: UsersState
  ) {
    console.log(this.usersState);
  }
}
