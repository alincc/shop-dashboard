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
import { ThreadService } from '../thread.service';

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
        .map((threads: any[]) => {
          return new collection.LoadSuccessAction(threads)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addThreadToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_THREAD)
    .map((action: collection.AddThreadAction) => action.payload)
    .switchMap((thread) => {
      return this.service.create(thread)
        .map((newThread) => new collection.AddThreadSuccessAction(newThread.data))
        .catch(() => of(new collection.AddThreadSuccessAction(thread)));
    });


  @Effect()
  removeThreadFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_THREAD)
    .map((action: collection.RemoveThreadAction) => action.payload)
    .switchMap(thread => {
      return this.service.remove(thread._id)
        .map(() => new collection.RemoveThreadSuccessAction(thread))
        .catch(() => of(new collection.RemoveThreadFailAction(thread)));
    });

  @Effect({ dispatch: false })
  removeThreadSuccess$ = this.actions$
    .ofType(collection.REMOVE_THREAD_SUCCESS, collection.REMOVE_MANY_THREADS_SUCCESS)
    .do(() => {
      this.toastService.success('Removed!', 'The thread was removed from the catalog');
    });

  @Effect({ dispatch: false })
  addThreadSuccess$ = this.actions$
    .ofType(collection.ADD_THREAD_SUCCESS)
    .do(() => {
      this.toastService.success('Success!', 'The thread was created');
    });

  @Effect()
  removeManyThreadsFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_MANY_THREADS)
    .map((action: collection.RemoveManyThreadsAction) => action.payload)
    .switchMap(ids => {
      return this.service.removeMany(ids)
        .map(() => new collection.RemoveManyThreadsSuccessAction(ids))
        .catch(() => of(new collection.RemoveManyThreadsFailAction(ids)));
    });

  constructor(
    private actions$: Actions,
    private service: ThreadService,
    private toastService: ToastService,
  ) {}
}
