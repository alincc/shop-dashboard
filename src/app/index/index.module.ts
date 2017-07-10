import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { IndexRoutingModule, routedComponents } from './index.routing';

@NgModule({
  imports: [
    SharedModule,
    CoreModule,
    IndexRoutingModule,
  ],
  declarations: [routedComponents]
})
export class IndexModule { }
