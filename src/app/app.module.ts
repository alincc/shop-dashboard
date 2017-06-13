import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { TitlePaneComponent } from './title-pane/title-pane.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MessageComponent } from './message/message.component';

import {
  ProductService,
  CategoryService,
  OrderService,
  CustomerService,
  ToastService,
  ConfirmationService,
} from './services';
import { ProductAddComponent } from './product-add/product-add.component';
import { LatestOrdersComponent } from './latest-orders/latest-orders.component';
import { CustomerListContainerComponent } from './customer-list-container/customer-list-container.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CategoryListContainerComponent } from './category-list-container/category-list-container.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TopMenuComponent,
    TitlePaneComponent,
    ProductListContainerComponent,
    ProductDetailComponent,
    ProductFormComponent,
    MessageComponent,
    ProductAddComponent,
    LatestOrdersComponent,
    CustomerListContainerComponent,
    CustomerDetailComponent,
    CustomerFormComponent,
    CategoryListContainerComponent,
    CategoryDetailComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    JasperoConfirmationsModule,
  ],
  providers: [
    ProductService,
    CategoryService,
    OrderService,
    CustomerService,
    ToastService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
