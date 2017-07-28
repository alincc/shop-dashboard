import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromProducts from '../reducers';
import * as productActions from '../actions/product';

@Component({
  selector: 'app-product-view',
  template: `
    <app-product-selected></app-product-selected>
  `,
  styles: [],
})
export class ProductViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromProducts.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new productActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
