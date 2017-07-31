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
import * as threadCollection from '../../messages/actions/collection';
import { ToastService } from '../../services';
import { OrderService } from '../order.service';

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
        .getOrders()
        .map((orders: any[]) => {
          return new collection.LoadSuccessAction(orders)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  removeOrderFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_ORDER)
    .map((action: collection.RemoveOrderAction) => action.payload)
    .switchMap(order => {
      return this.service.remove(order._id)
        .map(() => new collection.RemoveOrderSuccessAction(order))
        .catch(() => of(new collection.RemoveOrderFailAction(order)));
    });

  @Effect({ dispatch: false })
  removeOrderSuccess$ = this.actions$
    .ofType(collection.REMOVE_ORDER_SUCCESS, collection.REMOVE_MANY_ORDERS_SUCCESS)
    .do(() => {
      this.toastService.success('Removed!', 'The order was removed from the catalog');
    });

  @Effect({ dispatch: false })
  addOrderSuccess$ = this.actions$
    .ofType(collection.ADD_ORDER_SUCCESS)
    .do(() => {
      this.toastService.success('Success!', 'The order was created');
    });

  @Effect()
  removeManyOrdersFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_MANY_ORDERS)
    .map((action: collection.RemoveManyOrdersAction) => action.payload)
    .switchMap(ids => {
      return this.service.removeMany(ids)
        .map(() => new collection.RemoveManyOrdersSuccessAction(ids))
        .catch(() => of(new collection.RemoveManyOrdersFailAction(ids)));
    });

  constructor(
    private actions$: Actions,
    private service: OrderService,
    private toastService: ToastService,
  ) {}
}
