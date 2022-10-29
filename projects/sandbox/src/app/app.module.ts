import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NgxBaseStateDevtoolsConfig, NgxBaseStateDevtoolsModule, NGX_BASE_STATE_DEVTOOLS_CONFIG
} from 'projects/library/src/lib';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxBaseStateDevtoolsModule
    ],
    providers: [
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
