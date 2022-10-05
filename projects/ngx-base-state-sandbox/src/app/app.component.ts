import { Component } from '@angular/core';
import {
  UserState,
  UserAgeState,
  UserNameState,
  ProductsState,
  UserAuthorizationState,
  VideosState,
  ShortVideosState
} from './states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public readonly title = 'ngx-base-state-sandbox';

  constructor(
    public readonly userState: UserState,
    public readonly userAuthorizationState: UserAuthorizationState,
    public readonly userAgeState: UserAgeState,
    public readonly userNameState: UserNameState,
    public readonly productsState: ProductsState,
    public readonly videosState: VideosState,
    public readonly shortVideosState: ShortVideosState
  ) {
    console.log(arguments);
  }
}
