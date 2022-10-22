import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from './core';

const routes: Routes = [
    {
        path: AppRouteEnum.Counter,
        loadChildren: () => import('./pages/counter').then((m) => m.CounterModule)
    },
    {
        path: '**',
        redirectTo: AppRouteEnum.Counter,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
