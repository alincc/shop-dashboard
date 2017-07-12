import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductFormComponent } from './product-form/product-form.component';
import { SearchService } from './search.service';
import { AttributeEditorComponent } from './attribute-editor/attribute-editor.component';
import { CombinationControlComponent } from './attribute-editor/combination-control.component';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    ProductFormComponent,
    AttributeEditorComponent,
    CombinationControlComponent,
  ],
  providers: [
    SearchService,
  ]
})
export class ProductsModule { }
