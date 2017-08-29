import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductCollectionComponent } from './containers/product-collection.component';
import { OptionCollectionComponent } from './option-types/containers/option-collection.component';
import { OptionTypeViewComponent } from './option-types/containers/option-type-view.component';
import { ProductViewComponent } from './containers/product-view.component';
import { IndexComponent } from '../index/index.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: IndexComponent, children: [
    { path: 'products', component: ProductCollectionComponent },
    { path: 'product/create', component: ProductAddComponent },
    { path: 'product/:id', component: ProductViewComponent },
    { path: 'options', component: OptionCollectionComponent },
    { path: 'options/:id', component: OptionTypeViewComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

export const routedComponents = [
  ProductAddComponent,
  ProductCollectionComponent,
  ProductViewComponent,
  OptionCollectionComponent,
  OptionTypeViewComponent,
];
