import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCustomers from '../reducers';
import * as customerActions from '../actions/customer';
import { Customer } from '../models/customer';
import { ToastService } from '../../services';

@Component({
  selector: 'app-customer-selected',
  template: `
    <app-customer-detail
      [customer]="customer$ | async"
      (update)="onUpdate($event)">
    </app-customer-detail>
  `,
  styles: [],
})
export class CustomerSelectedComponent {
  customer$: Observable<Customer>;

  constructor(
    private store: Store<fromCustomers.State>,
    private toastService: ToastService,
  ) {
    this.customer$ = store.select(fromCustomers.getSelectedCustomer);
  }

  onUpdate(customer: Customer): void {
    this.store.dispatch(new customerActions.SaveAction(customer));
  }

}
