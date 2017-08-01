import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromOrders from '../reducers';
import * as collectionActions from '../actions/collection';
import * as orderActions from '../actions/order';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-collection',
  template: `
    <app-order-list-container
      [orders]="orders$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (removeSelected)="onRemoveSelected($event)">
    </app-order-list-container>
  `,
  styles: [],
})
export class OrderCollectionComponent {
  orders$: Observable<Order[]>;

  constructor(private store: Store<fromOrders.State>) {
    this.orders$ = this.store.select(fromOrders.getOrderCollection);
  }

  onCreate(order: Order): void {
    this.store.dispatch(new collectionActions.AddOrderAction(order));
  }

  onRemove(order: Order): void {
    this.store.dispatch(new collectionActions.RemoveOrderAction(order));
  }

  onRemoveSelected(orderIds: string[]): void {
    this.store.dispatch(new collectionActions.RemoveManyOrdersAction(orderIds))
  }

}
