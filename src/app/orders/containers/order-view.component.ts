import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromOrders from '../reducers';
import * as orderActions from '../actions/order';

@Component({
  selector: 'app-order-view',
  template: `
    <app-order-selected></app-order-selected>
  `,
  styles: [],
})
export class OrderViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromOrders.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new orderActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
