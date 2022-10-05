import { NgModule } from '@angular/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
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
    DetailsRoutingModule,
    NgxJsonViewerModule
  ]
})
export class DetailsModule {}
