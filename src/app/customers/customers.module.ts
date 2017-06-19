import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule, routedComponents } from './customers.routing';
import { CustomerFormComponent } from './customer-form/customer-form.component';

@NgModule({
  imports: [
    CustomersRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    CustomerFormComponent,
  ]
})
export class CustomersModule { }
