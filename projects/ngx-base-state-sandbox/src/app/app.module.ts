import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBaseStateDevtoolsModule } from 'projects/ngx-base-state/src/lib/devtools.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxBaseStateDevtoolsModule.setConfig({
      isEnabled: !environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
