import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule, routedComponents } from './orders.routing';
import { OrderUpdateStatusComponent } from './order-update-status/order-update-status.component';
import { OrderProductListComponent } from './order-product-list/order-product-list.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ProductAddComponent } from './product-add/product-add.component';

@NgModule({
  imports: [
    OrdersRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    OrderUpdateStatusComponent,
    OrderProductListComponent,
    ShippingInfoComponent,
    ShippingAddressComponent,
    ProductAddComponent,
  ]
})
export class OrdersModule { }
