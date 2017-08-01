import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromThreads from '../reducers';
import * as fromRoot from '../../reducers';
import * as threadActions from '../actions/thread';
import { Thread, Message, AddMessage, ThreadStatus } from '../message';
import { Order } from '../../orders/models/order';
import { ToastService } from '../../services';

@Component({
  selector: 'app-thread-selected',
  template: `
    <app-thread-detail
      [thread]="thread$ | async"
      [order]="order$ | async"
      (submitMessage)="onSubmitMessage($event)"
      (update)="onUpdate($event)">
    </app-thread-detail>
  `,
  styles: [],
})
export class ThreadSelectedComponent implements OnInit {
  thread$: Observable<Thread>;
  order$: Observable<Order>;

  constructor(
    private store: Store<fromThreads.State>,
    private toastService: ToastService,
  ) {
    this.thread$ = store.select(fromThreads.getSelectedThread);
    this.order$ = this.store.select(fromRoot.getSelectedThreadOrder);
  }

  ngOnInit() {
  }

  onUpdate(thread: Thread): void {
    this.store.dispatch(new threadActions.SaveAction(thread));
  }

  onSubmitMessage(addMessage: AddMessage): void {
    this.store.dispatch(new threadActions.AddMessageAction(addMessage));
  }

}
