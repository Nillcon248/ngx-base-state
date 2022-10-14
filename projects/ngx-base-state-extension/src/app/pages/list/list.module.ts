import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing';
import { ToolbarComponent } from './components';
import { SharedModule } from '../../shared';

@NgModule({
    declarations: [
        ToolbarComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
        ListRoutingModule
    ]
})
export class ListModule {}
