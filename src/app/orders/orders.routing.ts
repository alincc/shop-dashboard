import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderViewComponent } from './containers/order-view.component';
import { OrderCollectionComponent } from './containers/order-collection.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'orders', component: OrderCollectionComponent },
    { path: 'order/:id', component: OrderViewComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

export const routedComponents = [OrderViewComponent, OrderCollectionComponent];
