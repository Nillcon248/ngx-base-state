import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing';
import { SharedModule } from '../../shared';
import { ToolbarComponent, ContentModule } from './components';

@NgModule({
  declarations: [
    DetailsComponent,
    ToolbarComponent
  ],
  imports: [
    SharedModule,
    DetailsRoutingModule,
    ContentModule
  ]
})
export class DetailsModule {}
