import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/extension/src/app/shared';
import {
    ActionListComponent,
    StateListComponent, StatesFiltersComponent, ToolbarComponent
} from './components';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing';

@NgModule({
    declarations: [
        ToolbarComponent,
        ListComponent,
        StatesFiltersComponent,
        ActionListComponent,
        StateListComponent
    ],
    imports: [
        SharedModule,
        ListRoutingModule
    ]
})
export class ListModule {}
