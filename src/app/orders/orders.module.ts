import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule, routedComponents } from './orders.routing';
import { OrderUpdateStatusComponent } from './components/order-update-status/order-update-status.component';
import { OrderProductListComponent } from './components/order-product-list/order-product-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderSelectedComponent } from './containers/order-selected.component';
import { OrderListContainerComponent } from './components/order-list-container/order-list-container.component';
import { ShippingInfoComponent } from './components/shipping-info/shipping-info.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { MessagesModule } from '../messages/messages.module';
import { OrderService } from './order.service';
import { CollectionEffects } from './effects/collection';
import { OrderEffects } from './effects/order';
import { reducers } from './reducers';

@NgModule({
  imports: [
    OrdersRoutingModule,
    SharedModule,
    MessagesModule,
    StoreModule.forFeature('orders', reducers),

    EffectsModule.forFeature([OrderEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    OrderUpdateStatusComponent,
    OrderProductListComponent,
    OrderSelectedComponent,
    OrderDetailComponent,
    OrderListContainerComponent,
    ShippingInfoComponent,
    ShippingAddressComponent,
    ProductAddComponent,
  ],
  providers: [
    OrderService,
  ],
})
export class OrdersModule { }
