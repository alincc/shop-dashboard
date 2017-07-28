import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListContainerComponent } from './components/product-list-container/product-list-container.component';
import { SearchService } from './search.service';
import { AttributeEditorComponent } from './components/attribute-editor/attribute-editor.component';
import { ProductSelectedComponent } from './containers/product-selected.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CombinationControlComponent } from './components/attribute-editor/combination-control.component';
import { ProductService } from './product.service';
import { CollectionEffects } from './effects/collection';
import { ProductEffects } from './effects/product';
import { reducers } from './reducers';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', reducers),

    EffectsModule.forFeature([ProductEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    ProductFormComponent,
    AttributeEditorComponent,
    CombinationControlComponent,
    ProductSelectedComponent,
    ProductListContainerComponent,
    ProductDetailComponent,
  ],
  providers: [
    SearchService,
    ProductService,
  ]
})
export class ProductsModule { }
