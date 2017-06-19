import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrierListComponent } from './carrier-list/carrier-list.component';
import { CarrierDetailComponent } from './carrier-detail/carrier-detail.component';

const routes: Routes = [
  { path: 'carriers', component: CarrierListComponent },
  { path: 'carrier/:id', component: CarrierDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarriersRoutingModule { }

export const routedComponents = [CarrierListComponent, CarrierDetailComponent];
