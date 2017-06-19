import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    ProductFormComponent,
  ]
})
export class ProductsModule { }
