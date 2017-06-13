import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { CustomerListContainerComponent } from './customer-list-container/customer-list-container.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListContainerComponent } from './category-list-container/category-list-container.component';
import { OrderListContainerComponent } from './order-list-container/order-list-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'customers', component: CustomerListContainerComponent },
  { path: 'customer/:id', component: CustomerDetailComponent },
  { path: 'products', component: ProductListContainerComponent },
  { path: 'product/create', component: ProductAddComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'categories', component: CategoryListContainerComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'orders', component: OrderListContainerComponent },
  { path: 'order/:id', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
