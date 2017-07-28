import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCustomers from '../reducers';
import * as collectionActions from '../actions/collection';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer-collection',
  template: `
    <app-customer-list-container
      [customers]="customers$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (removeSelected)="onRemoveSelected($event)">
    </app-customer-list-container>
  `,
  styles: [],
})
export class CustomerCollectionComponent {
  customers$: Observable<Customer[]>;

  constructor(private store: Store<fromCustomers.State>) {
    this.customers$ = this.store.select(fromCustomers.getCustomerCollection);
  }

  onCreate(customer: Customer): void {
    this.store.dispatch(new collectionActions.AddCustomerAction(customer));
  }

  onRemove(customer: Customer): void {
    this.store.dispatch(new collectionActions.RemoveCustomerAction(customer));
  }

  onRemoveSelected(customerIds: string[]): void {
    this.store.dispatch(new collectionActions.RemoveManyCustomersAction(customerIds))
  }

}
