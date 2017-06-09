import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListContainerComponent },
  { path: 'product/create', component: ProductAddComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
