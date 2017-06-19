import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule, routedComponents } from './categories.routing';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    SharedModule,
  ],
  declarations: [
    routedComponents,
    CategoryFormComponent,
  ]
})
export class CategoriesModule { }
