import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromOrders from '../reducers';
import * as orderActions from '../actions/order';
import * as customerActions from '../../customers/actions/customer';
import * as threadActions from '../../messages/actions/thread';
import { Customer } from '../../customers/models/customer';
import { Message as CustomerMessage, AddMessage } from '../../messages/message';
import { Order, OrderLine } from '../models/order';
import { ToastService } from '../../services';

@Component({
  selector: 'app-order-selected',
  template: `
    <app-order-detail
      [order]="order$ | async"
      [thread]="thread$ | async"
      (update)="onUpdate($event)"
      (addProduct)="onAddProduct($event)"
      (addCustomerNote)="onAddCustomerNote($event)"
      (addMessage)="onSubmitMessage($event)">
    </app-order-detail>
  `,
  styles: [],
})
export class OrderSelectedComponent {
  order$: Observable<Order>;
  thread$: Observable<any>;

  constructor(
    private store: Store<fromOrders.State>,
    private toastService: ToastService,
  ) {
    this.order$ = store.select(fromOrders.getSelectedOrder);
    this.thread$ = store.select(fromOrders.getSelectedOrderThread);
  }

  onUpdate(order: Order): void {
    this.store.dispatch(new orderActions.SaveAction(order));
  }

  onAddProduct(payload: any): void {
    this.store.dispatch(new orderActions.AddProductAction(payload));
  }

  onAddCustomerNote(customer: Customer): void {
    this.store.dispatch(new customerActions.SaveAction(customer));
  }

  onSubmitMessage(values: { addMessage: AddMessage, order: Order }): void {
    if (values.addMessage.threadId === null && values.order !== null) {
      this.store.dispatch(new orderActions.AddNewThreadAction(values));
    }
    else {
      this.store.dispatch(new threadActions.AddMessageAction(values.addMessage));
    }
  }

}
