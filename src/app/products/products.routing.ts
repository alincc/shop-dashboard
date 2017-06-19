import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';


const routes: Routes = [
  { path: 'products', component: ProductListContainerComponent },
  { path: 'product/create', component: ProductAddComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

export const routedComponents = [ProductListContainerComponent, ProductDetailComponent, ProductAddComponent];
