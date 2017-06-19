import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CarriersRoutingModule, routedComponents } from './carriers.routing';
import { CarrierService } from './carrier.service';
import { CarrierFormComponent } from './carrier-form/carrier-form.component';

@NgModule({
  imports: [
    CarriersRoutingModule,
    SharedModule,
  ],
  declarations: [routedComponents, CarrierFormComponent],
  providers: [
    CarrierService,
  ],
})
export class CarriersModule { }
