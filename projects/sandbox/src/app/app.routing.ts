import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from '@sandbox-core';
import { LayoutsModule, MainLayoutComponent } from '@sandbox-layouts';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: AppRouteEnum.Counter,
                loadChildren: () => import('./pages/counter').then((m) => m.CounterModule)
            },
            {
                path: AppRouteEnum.Todos,
                loadChildren: () => import('./pages/todos').then((m) => m.TodosModule)
            },
            {
                path: '**',
                redirectTo: AppRouteEnum.Counter,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule,
        LayoutsModule
    ]
})
export class AppRoutingModule {}
