import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule, routedComponents } from './home.routing';
import { LatestOrdersComponent } from './latest-orders/latest-orders.component';

@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    LatestOrdersComponent,
  ]
})
export class HomeModule { }
