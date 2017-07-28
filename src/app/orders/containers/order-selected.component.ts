import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromOrders from '../reducers';
import * as orderActions from '../actions/order';
import * as customerActions from '../../customers/actions/customer';
import { Customer } from '../../customers/models/customer';
import { Order, OrderLine } from '../models/order';
import { ToastService } from '../../services';

@Component({
  selector: 'app-order-selected',
  template: `
    <app-order-detail
      [order]="order$ | async"
      (update)="onUpdate($event)"
      (addProduct)="onAddProduct($event)"
      (addCustomerNote)="onAddCustomerNote($event)">
    </app-order-detail>
  `,
  styles: [],
})
export class OrderSelectedComponent {
  order$: Observable<Order>;

  constructor(
    private store: Store<fromOrders.State>,
    private toastService: ToastService,
  ) {
    this.order$ = store.select(fromOrders.getSelectedOrder);
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

}
