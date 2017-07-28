import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { ToastService } from '../../services';
import { CustomerService } from '../customer.service';

@Injectable()
export class CollectionEffects {
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() => {
      return this.service
        .getAll()
        .map((customers: any[]) => {
          return new collection.LoadSuccessAction(customers)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addCustomerToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_CUSTOMER)
    .map((action: collection.AddCustomerAction) => action.payload)
    .switchMap((customer) => {
      return this.service.create(customer)
        .map((newCustomer) => new collection.AddCustomerSuccessAction(newCustomer.data))
        .catch(() => of(new collection.AddCustomerSuccessAction(customer)));
    });


  @Effect()
  removeCustomerFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_CUSTOMER)
    .map((action: collection.RemoveCustomerAction) => action.payload)
    .switchMap(customer => {
      return this.service.remove(customer._id)
        .map(() => new collection.RemoveCustomerSuccessAction(customer))
        .catch(() => of(new collection.RemoveCustomerFailAction(customer)));
    });

  @Effect({ dispatch: false })
  removeCustomerSuccess$ = this.actions$
    .ofType(collection.REMOVE_CUSTOMER_SUCCESS, collection.REMOVE_MANY_CUSTOMERS_SUCCESS)
    .do(() => {
      this.toastService.success('Removed!', 'The customer was removed from the catalog');
    });

  @Effect({ dispatch: false })
  addCustomerSuccess$ = this.actions$
    .ofType(collection.ADD_CUSTOMER_SUCCESS)
    .do(() => {
      this.toastService.success('Success!', 'The customer was created');
    });

  @Effect()
  removeManyCustomersFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_MANY_CUSTOMERS)
    .map((action: collection.RemoveManyCustomersAction) => action.payload)
    .switchMap(ids => {
      return this.service.removeMany(ids)
        .map(() => new collection.RemoveManyCustomersSuccessAction(ids))
        .catch(() => of(new collection.RemoveManyCustomersFailAction(ids)));
    });

  constructor(
    private actions$: Actions,
    private service: CustomerService,
    private toastService: ToastService,
  ) {}
}
