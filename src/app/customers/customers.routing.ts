import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerViewComponent } from './containers/customer-view.component';
import { CustomerCollectionComponent } from './containers/customer-collection.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'customers', component: CustomerCollectionComponent },
    { path: 'customer/:id', component: CustomerViewComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

export const routedComponents = [CustomerCollectionComponent, CustomerViewComponent];
