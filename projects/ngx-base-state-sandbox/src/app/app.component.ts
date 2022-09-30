import { Component } from '@angular/core';
import { UserState, ProductsState } from './states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngx-base-state-sandbox';

  constructor(
    private readonly userState: UserState,
    private readonly productsState: ProductsState
  ) {
    console.log(this.userState, this.productsState);
  }
}
