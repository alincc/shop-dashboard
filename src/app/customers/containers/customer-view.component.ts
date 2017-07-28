import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromCustomers from '../reducers';
import * as customerActions from '../actions/customer';

@Component({
  selector: 'app-customer-view',
  template: `
    <app-customer-selected></app-customer-selected>
  `,
  styles: [],
})
export class CustomerViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromCustomers.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new customerActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
