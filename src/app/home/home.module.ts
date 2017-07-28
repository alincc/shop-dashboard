import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule, routedComponents } from './home.routing';
import { LatestOrdersComponent } from './latest-orders/latest-orders.component';
import { OrdersModule } from '../orders/orders.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    OrdersModule,
  ],
  declarations: [
    routedComponents,
    LatestOrdersComponent,
  ]
})
export class HomeModule { }
