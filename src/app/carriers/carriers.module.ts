import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CarriersRoutingModule, routedComponents } from './carriers.routing';
import { CarrierService } from './carrier.service';
import { CarrierFormComponent } from './carrier-form/carrier-form.component';

// import { reducers } from './reducers';

@NgModule({
  imports: [
    CarriersRoutingModule,
    SharedModule,
    // StoreModule.forFeature('books', reducers),
  ],
  declarations: [routedComponents, CarrierFormComponent],
  providers: [
    CarrierService,
  ],
})
export class CarriersModule { }
