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
import { ToastService } from '../../../services';
import { OptionTypeService } from '../option-type.service';

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
        .map((optionTypes: any[]) => {
          return new collection.LoadSuccessAction(optionTypes)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addOptionTypeToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_OPTIONTYPE)
    .map((action: collection.AddOptionTypeAction) => action.payload)
    .switchMap((optionType) => {
      return this.service.create(optionType)
        .map((newOptionType) => new collection.AddOptionTypeSuccessAction(newOptionType.data))
        .catch(() => of(new collection.AddOptionTypeSuccessAction(optionType)));
    });


  @Effect()
  removeOptionTypeFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_OPTIONTYPE)
    .map((action: collection.RemoveOptionTypeAction) => action.payload)
    .switchMap(remove => {
      return this.service.remove(remove.optionType._id, remove.soft)
        .map((response) => {
          return new collection.RemoveOptionTypeSuccessAction({ optionType: response.data, soft: remove.soft })
        })
        .catch(() => of(new collection.RemoveOptionTypeFailAction(remove.optionType)));
    });

  @Effect({ dispatch: false })
  removeOptionTypeSuccess$ = this.actions$
    .ofType(collection.REMOVE_OPTIONTYPE_SUCCESS)
    .do(() => {
      this.toastService.success('Removed!', 'The option type was removed from the catalog');
    });


  @Effect({ dispatch: false })
  addOptionTypeSuccess$ = this.actions$
    .ofType(collection.ADD_OPTIONTYPE_SUCCESS)
    .do(() => {
      this.toastService.success('Success!', 'The opion type was created');
    });

  constructor(
    private actions$: Actions,
    private service: OptionTypeService,
    private toastService: ToastService,
  ) {}
}
