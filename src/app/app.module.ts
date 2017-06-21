import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CarriersModule } from './carriers/carriers.module';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../testing/router-stubs';

import {
  ProductService,
  CategoryService,
  OrderService,
  CustomerService,
  AttributeService,
  ToastService,
  ConfirmationService,
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    RouterLinkStubDirective,
    RouterOutletStubComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    CategoriesModule,
    CarriersModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    ProductService,
    CategoryService,
    OrderService,
    CustomerService,
    AttributeService,
    ToastService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
