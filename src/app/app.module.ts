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
import { MessagesModule } from './messages/messages.module';
import { CarriersModule } from './carriers/carriers.module';
import { IndexModule } from './index/index.module';
import { AuthModule } from './auth/auth.module';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, developmentReducerFactory } from './reducers';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../testing/router-stubs';

import {
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
    CoreModule.forRoot(),
    SharedModule,
    HomeModule,
    ProductsModule,
    CustomersModule,
    AuthModule,
    IndexModule,
    OrdersModule,
    CategoriesModule,
    MessagesModule,
    CarriersModule,
    SimpleNotificationsModule.forRoot(),

    StoreModule.forRoot(reducers, {
      reducerFactory: developmentReducerFactory,
      // reducerFactory: !environment.production
        // ? developmentReducerFactory
        // : undefined,
    }),

    StoreDevtoolsModule.instrument(),

    EffectsModule.forRoot([]),

    AppRoutingModule,
  ],
  providers: [
    AttributeService,
    ToastService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
