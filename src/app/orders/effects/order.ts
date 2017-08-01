import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as orderActions from '../actions/order';
import * as threadActions from '../../messages/actions/thread';
import * as threadCollection from '../../messages/actions/collection';
import { OrderService } from '../order.service';
import { ToastService } from '../../services';

@Injectable()
export class OrderEffects {
  @Effect()
  saveOrder$: Observable<Action> = this.actions$
    .ofType(orderActions.SAVE)
    .map((action: orderActions.SaveAction) => action.payload)
    .switchMap((order) => {
      return this.service.update(order._id, order)
        .map((newOrder) => new orderActions.SaveSuccessAction(newOrder.data))
        .catch(() => of(new orderActions.SaveFailAction(order)));
    })

  @Effect({ dispatch: false })
  saveOrderSuccess$ = this.actions$
    .ofType(orderActions.SAVE_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The order was updated');
    });

  @Effect()
  addProduct$: Observable<Action> = this.actions$
    .ofType(orderActions.ADD_PRODUCT)
    .map((action: orderActions.AddProductAction) => action.payload)
    .switchMap((payload) => {
      return this.service.addProduct(payload.order._id, payload.line)
        .map((data) => new orderActions.AddProductSuccessAction(data.data))
        .catch(() => of(new orderActions.AddProductFailAction(payload)));
    });

  @Effect()
  addThread$: Observable<Action> = this.actions$
    .ofType(orderActions.ADD_NEW_THREAD)
    .map((action: orderActions.AddNewThreadAction) => action.payload)
    .switchMap((payload) => {
      return this.service.addThread(payload.order._id)
        .map((data) => new orderActions.AddNewThreadSuccessAction({ order: data.data, addMessage: { message: payload.addMessage.message, threadId: data.data.thread._id }}))
        .catch(() => of(new orderActions.AddNewThreadFailAction(payload.order)));
    });

  @Effect()
  addThreadSuccess$: Observable<Action> = this.actions$
    .ofType(orderActions.ADD_NEW_THREAD_SUCCESS)
    .map((action: orderActions.AddNewThreadSuccessAction) => action.payload)
    .mergeMap((payload) => {
      return [
        new threadActions.AddMessageAction(payload.addMessage),
        new threadCollection.AddThreadSuccessAction(payload.order.thread),
      ];
    });

  @Effect({ dispatch: false })
  addProductSuccess$ = this.actions$
    .ofType(orderActions.ADD_PRODUCT_SUCCESS)
    .do(() => {
      this.toastService.success('Product added', 'The product was added to the order');
    });

  constructor(
    private actions$: Actions,
    private service: OrderService,
    private toastService: ToastService,
  ) {}
}
