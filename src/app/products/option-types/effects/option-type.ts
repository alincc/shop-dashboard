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

import * as optionTypeActions from '../actions/option-type';
import { OptionTypeService } from '../option-type.service';
import { ToastService } from '../../../services';

@Injectable()
export class OptionTypeEffects {
  @Effect()
  saveOptionType$: Observable<Action> = this.actions$
    .ofType(optionTypeActions.SAVE)
    .map((action: optionTypeActions.SaveAction) => action.payload)
    .switchMap((optionType) => {
      return this.service.update(optionType._id, optionType)
        .map((newOptionType) => new optionTypeActions.SaveSuccessAction(newOptionType.data))
        .catch(() => of(new optionTypeActions.SaveFailAction(optionType)));
    })

  @Effect({ dispatch: false })
  saveOptionTypeSuccess$ = this.actions$
    .ofType(optionTypeActions.SAVE_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The optionType was updated');
    });

  constructor(
    private actions$: Actions,
    private service: OptionTypeService,
    private toastService: ToastService,
  ) {}
}
