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

import * as categoryActions from '../actions/category';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
  @Effect()
  saveCategory$: Observable<Action> = this.actions$
    .ofType(categoryActions.SAVE)
    .map((action: categoryActions.SaveAction) => action.payload)
    .switchMap((category) => {
      return this.service.update(category._id, category)
        .map((newCategory) => new categoryActions.SaveSuccessAction(newCategory.data))
        .catch(() => of(new categoryActions.SaveFailAction(category)));
    })

  constructor(
    private actions$: Actions,
    private service: CategoryService,
  ) {}
}
