import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule, routedComponents } from './customers.routing';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListContainerComponent } from './components/customer-list-container/customer-list-container.component';
import { CustomerSelectedComponent } from './containers/customer-selected.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { CustomerService } from './customer.service';
import { CollectionEffects } from './effects/collection';
import { CustomerEffects } from './effects/customer';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CustomersRoutingModule,
    SharedModule,

    StoreModule.forFeature('customers', reducers),

    EffectsModule.forFeature([CustomerEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    CustomerFormComponent,
    CustomerListContainerComponent,
    CustomerSelectedComponent,
    CustomerDetailComponent,
  ],
  providers: [
    CustomerService,
  ],
})
export class CustomersModule { }
