import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CarriersRoutingModule, routedComponents } from './carriers.routing';
import { CarrierService } from './carrier.service';
import { CarrierFormComponent } from './components/carrier-form/carrier-form.component';
import { CarrierListComponent } from './components/carrier-list/carrier-list.component';
import { CarrierDetailComponent } from './components/carrier-detail/carrier-detail.component';
import { CollectionEffects } from './effects/collection';
import { CarrierEffects } from './effects/carrier';

import { reducers } from './reducers';
import { CarrierSelectedComponent } from './containers/carrier-selected/carrier-selected.component';

@NgModule({
  imports: [
    CarriersRoutingModule,
    SharedModule,
    StoreModule.forFeature('carriers', reducers),

    EffectsModule.forFeature([CarrierEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    CarrierFormComponent,
    CarrierListComponent,
    CarrierSelectedComponent,
    CarrierDetailComponent,
  ],
  providers: [
    CarrierService,
  ],
})
export class CarriersModule { }
