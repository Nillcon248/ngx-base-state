import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import { DetailsRoutingModule } from './details.routing';
import { SharedModule } from '../../shared';
import { ToolbarComponent, ContentComponent } from './components';

@NgModule({
  declarations: [
    DetailsComponent,
    ToolbarComponent,
    ContentComponent
  ],
  imports: [
    SharedModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule {}
