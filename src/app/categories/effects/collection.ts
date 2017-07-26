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
import { CategoryService } from '../../services/category.service';

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
        .getCategories()
        .map((categories: any[]) => {
          return new collection.LoadSuccessAction(categories)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addCategoryToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_CATEGORY)
    .map((action: collection.AddCategoryAction) => action.payload)
    .switchMap((category) => {
      return this.service.create(category)
        .map((newCategory) => new collection.AddCategorySuccessAction(newCategory.data))
        .catch(() => of(new collection.AddCategorySuccessAction(category)));
    });

  @Effect()
  removeCategoryFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_CATEGORY)
    .map((action: collection.RemoveCategoryAction) => action.payload)
    .switchMap(category => {
      return this.service.removeCategory(category._id)
        .map(() => new collection.RemoveCategorySuccessAction(category))
        .catch(() => of(new collection.RemoveCategoryFailAction(category)));
    });

  constructor(private actions$: Actions, private service: CategoryService) {}
}
