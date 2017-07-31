import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromThreads from '../reducers';
import * as threadActions from '../actions/thread';
import { Thread, Message, AddMessage, ThreadStatus } from '../message';
import { ToastService } from '../../services';

@Component({
  selector: 'app-thread-selected',
  template: `
    <app-thread-detail
      [thread]="thread$ | async"
      (submitMessage)="onSubmitMessage($event)"
      (update)="onUpdate($event)">
    </app-thread-detail>
  `,
  styles: [],
})
export class ThreadSelectedComponent {
  thread$: Observable<Thread>;

  constructor(
    private store: Store<fromThreads.State>,
    private toastService: ToastService,
  ) {
    this.thread$ = store.select(fromThreads.getSelectedThread);
  }

  onUpdate(thread: Thread): void {
    this.store.dispatch(new threadActions.SaveAction(thread));
  }

  onSubmitMessage(addMessage: AddMessage): void {
    this.store.dispatch(new threadActions.AddMessageAction(addMessage));
  }

}
