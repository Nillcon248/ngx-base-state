import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error.routing';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    SharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule {}
