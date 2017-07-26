import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as carrierActions from '../actions/carrier';
import { CarrierService } from '../carrier.service';

@Injectable()
export class CarrierEffects {
  @Effect()
  saveCarrier$: Observable<Action> = this.actions$
    .ofType(carrierActions.SAVE)
    .map((action: carrierActions.SaveAction) => action.payload)
    .switchMap((carrier) => {
      return this.service.update(carrier._id, carrier)
        .map((newCarrier) => new carrierActions.SaveSuccessAction(newCarrier.data))
        .catch(() => of(new carrierActions.SaveFailAction(carrier)));
    })

  constructor(
    private actions$: Actions,
    private service: CarrierService,
  ) {}
}
