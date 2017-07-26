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
import { CarrierService } from '../carrier.service';

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
        .map((carriers: any[]) => {
          return new collection.LoadSuccessAction(carriers)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addCarrierToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_SHIPPING)
    .map((action: collection.AddShippingAction) => action.payload)
    .switchMap((carrier) => {
      return this.service.create(carrier)
        .map((newCarrier) => new collection.AddShippingSuccessAction(newCarrier.data))
        .catch(() => of(new collection.AddShippingFailAction(carrier)));
    });

  @Effect()
  removeCarrierFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_SHIPPING)
    .map((action: collection.RemoveShippingAction) => action.payload)
    .switchMap(carrier => {
      return this.service.remove(carrier._id)
        .map(() => new collection.RemoveShippingSuccessAction(carrier))
        .catch(() => of(new collection.RemoveShippingFailAction(carrier)));
    });

  constructor(private actions$: Actions, private service: CarrierService) {}
}
