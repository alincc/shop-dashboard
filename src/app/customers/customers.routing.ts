import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListContainerComponent } from './customer-list-container/customer-list-container.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'customers', component: CustomerListContainerComponent },
    { path: 'customer/:id', component: CustomerDetailComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

export const routedComponents = [CustomerListContainerComponent, CustomerDetailComponent];
