import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule, routedComponents } from './categories.routing';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategorySelectedComponent } from './containers/category-selected.component';
import { CategoryService } from './category.service';
import { CollectionEffects } from './effects/collection';
import { CategoryEffects } from './effects/category';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    SharedModule,

    StoreModule.forFeature('categories', reducers),

    EffectsModule.forFeature([CategoryEffects, CollectionEffects]),
  ],
  declarations: [
    routedComponents,
    CategoryFormComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CategorySelectedComponent,
  ],
  providers: [
    CategoryService,
  ],
})
export class CategoriesModule { }
