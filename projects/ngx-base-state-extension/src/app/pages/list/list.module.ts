import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule
  ]
})
export class ListModule {}
