import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListContainerComponent } from './order-list-container/order-list-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  { path: 'orders', component: OrderListContainerComponent },
  { path: 'order/:id', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

export const routedComponents = [OrderListContainerComponent, OrderDetailComponent];
