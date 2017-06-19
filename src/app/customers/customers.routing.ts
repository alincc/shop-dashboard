import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListContainerComponent } from './customer-list-container/customer-list-container.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListContainerComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

export const routedComponents = [CustomerListContainerComponent, CustomerDetailComponent];
