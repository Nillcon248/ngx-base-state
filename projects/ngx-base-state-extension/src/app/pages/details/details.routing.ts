import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { DetailsParamEnum } from './enums';

const routes: Routes = [
  {
    path: `:${DetailsParamEnum.ClassName}`,
    component: DetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DetailsRoutingModule {}
