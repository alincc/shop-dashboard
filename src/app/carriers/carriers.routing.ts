import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrierCollectionComponent } from './containers/carrier-collection/carrier-collection.component';
import { CarrierViewComponent } from './containers/carrier-view/carrier-view.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'carriers', component: CarrierCollectionComponent, canActivate: [AuthGuard] },
    { path: 'carrier/:id', component: CarrierViewComponent, canActivate: [AuthGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarriersRoutingModule { }

export const routedComponents = [CarrierCollectionComponent, CarrierViewComponent];
