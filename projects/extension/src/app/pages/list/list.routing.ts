import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGuard } from './guards';
import { ListComponent } from './list.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [ListGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ListGuard
    ]
})
export class ListRoutingModule {}
