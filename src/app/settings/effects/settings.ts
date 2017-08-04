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

import * as settings from '../actions/settings';
import { ToastService } from '../../services';
import { SettingsService } from '../settings.service';


@Injectable()
export class SettingsEffects {
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadSettings$: Observable<Action> = this.actions$
    .ofType(settings.LOAD)
    .startWith(new settings.LoadAction())
    .switchMap(() => {
      return this.service
        .get()
        .map((data: any) => new settings.LoadSuccessAction(data))
        .catch((e) => of(new settings.LoadFailAction(e)));
    });

  @Effect()
  updateSettings$: Observable<Action> = this.actions$
    .ofType(settings.UPDATE_PROPERTY)
    .map((action: settings.UpdateSettingsAction) => action.payload)
    .switchMap((data) => {
      return this.service
        .update(data)
        .map((response: any) => new settings.UpdateSettingsSuccessAction(response.data))
        .catch((e) => of(new settings.UpdateSettingsFailAction(e)));
    });

  @Effect({ dispatch: false })
  updateSettingsSuccess$ = this.actions$
    .ofType(settings.UPDATE_PROPERTY_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The settings was updated');
    });

  constructor(
    private actions$: Actions,
    private service: SettingsService,
    private toastService: ToastService,
  ) {}
}
