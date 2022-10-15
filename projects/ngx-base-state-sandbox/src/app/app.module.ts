import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    NgxBaseStateDevtoolsModule,
    NgxBaseStateDevtoolsConfig,
    NGX_BASE_STATE_DEVTOOLS_CONFIG
} from '@ngx-base-state';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { VideosState } from './states';
import { UfoTableComponent } from './components';

@NgModule({
    declarations: [
        AppComponent,
        UfoTableComponent
    ],
    imports: [
        BrowserModule,
        NgxBaseStateDevtoolsModule
    ],
    providers: [
        VideosState,
        {
            provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
            useValue: new NgxBaseStateDevtoolsConfig({
                isEnabled: !environment.production
            })
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
