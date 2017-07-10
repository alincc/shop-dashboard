import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListContainerComponent } from './order-list-container/order-list-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'orders', component: OrderListContainerComponent },
    { path: 'order/:id', component: OrderDetailComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

export const routedComponents = [OrderListContainerComponent, OrderDetailComponent];
