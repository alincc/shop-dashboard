import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule, routedComponents } from './products.routing';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { VariantFormComponent } from './components/variants/variant-form.component';
import { VariantEditComponent } from './components/variants/variant-edit.component';
import { AddedOptionTypesComponent } from './components/variants/added-option-types.component';
import { AttachOptionTypeComponent } from './components/variants/attach-option-type.component';
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
import { reducers as optionTypeReducers } from './option-types/reducers';
import { OptionTypeService } from './option-types/option-type.service';
import { OptionTypeEffects } from './option-types/effects/option-type';
import { CollectionEffects as OptionTypeCollectionEffects } from './option-types/effects/collection';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
    StoreModule.forFeature('products', reducers),
    StoreModule.forFeature('option-types', optionTypeReducers),

    EffectsModule.forFeature([ProductEffects, CollectionEffects, OptionTypeEffects, OptionTypeCollectionEffects]),
  ],
  declarations: [
    routedComponents,
    ProductFormComponent,
    AttributeEditorComponent,
    CombinationControlComponent,
    ProductSelectedComponent,
    AddedOptionTypesComponent,
    AttachOptionTypeComponent,
    ProductListContainerComponent,
    ProductDetailComponent,
    VariantFormComponent,
    VariantEditComponent,
  ],
  providers: [
    SearchService,
    ProductService,
    OptionTypeService,
  ]
})
export class ProductsModule { }
