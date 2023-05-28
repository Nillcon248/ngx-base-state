import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    NgxBaseStateDevtoolsModule
} from '@ngx-base-state';
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
        NgxBaseStateDevtoolsModule.forRoot({ isEnabled: !environment.production })
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
