import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing';
import {
    ToolbarComponent,
    StatesFiltersComponent,
    ActionListComponent,
    StateListComponent
} from './components';
import { SharedModule } from '@extension-shared';

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
