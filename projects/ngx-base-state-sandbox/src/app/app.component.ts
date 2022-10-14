import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from './services';
import {
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
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public isUfoTableVisible = false;

    constructor(
        public readonly userService: UserService,
        public readonly userAuthorizationState: UserAuthorizationState,
        public readonly userAgeState: UserAgeState,
        public readonly userNameState: UserNameState,
        public readonly productsState: ProductsState,
        public readonly videosState: VideosState,
        public readonly shortVideosState: ShortVideosState
    ) {
        this.userService.incrementAge();

        setInterval(() => {
            this.userService.incrementAge();
        }, 1000);
    }

    public onToggleUfoTableButtonClick(): void {
        this.isUfoTableVisible = !this.isUfoTableVisible;
    }
}
