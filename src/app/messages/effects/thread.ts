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

import * as threadActions from '../actions/thread';
import { ThreadService } from '../thread.service';
import { ToastService } from '../../services';

@Injectable()
export class ThreadEffects {
  @Effect()
  saveThread$: Observable<Action> = this.actions$
    .ofType(threadActions.SAVE)
    .map((action: threadActions.SaveAction) => action.payload)
    .switchMap((thread) => {
      return this.service.update(thread._id, thread)
        .map((newThread) => new threadActions.SaveSuccessAction(newThread.data))
        .catch(() => of(new threadActions.SaveFailAction(thread)));
    })

  @Effect({ dispatch: false })
  saveThreadSuccess$ = this.actions$
    .ofType(threadActions.SAVE_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The thread was updated');
    });

  @Effect()
  addMessage$: Observable<Action> = this.actions$
    .ofType(threadActions.ADD_MESSAGE)
    .map((action: threadActions.AddMessageAction) => action.payload)
    .switchMap((addMessage) => {
      return this.service.addMessage(addMessage)
        .map((thread) => new threadActions.AddMessageSuccessAction(thread.data))
        .catch(() => of(new threadActions.AddMessageFailAction()));
    })

  constructor(
    private actions$: Actions,
    private service: ThreadService,
    private toastService: ToastService,
  ) {}
}
