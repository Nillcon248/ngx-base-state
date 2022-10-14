import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBaseStateDevtoolsModule } from 'projects/ngx-base-state/src/lib/devtools.module';
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
    NgxBaseStateDevtoolsModule.setConfig({
      isEnabled: !environment.production
    })
  ],
  providers: [
    VideosState
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
