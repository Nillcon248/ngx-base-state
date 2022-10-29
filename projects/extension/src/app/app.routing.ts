import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRouteEnum } from './core';

const routes: Routes = [
  {
    path: AppRouteEnum.List,
    loadChildren: () => import('./pages/list').then((m) => m.ListModule)
  },
  {
    path: AppRouteEnum.Details,
    loadChildren: () => import('./pages/details').then((m) => m.DetailsModule)
  },
  {
    path: AppRouteEnum.Error,
    loadChildren: () => import('./pages/error').then((m) => m.ErrorModule)
  },
  {
    path: '**',
    redirectTo: AppRouteEnum.List,
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
