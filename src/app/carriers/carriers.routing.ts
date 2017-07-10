import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrierListComponent } from './carrier-list/carrier-list.component';
import { CarrierDetailComponent } from './carrier-detail/carrier-detail.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'carriers', component: CarrierListComponent, canActivate: [AuthGuard] },
    { path: 'carrier/:id', component: CarrierDetailComponent, canActivate: [AuthGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarriersRoutingModule { }

export const routedComponents = [CarrierListComponent, CarrierDetailComponent];
