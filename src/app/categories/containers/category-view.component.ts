import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromCategories from '../reducers';
import * as categoryActions from '../actions/category';

@Component({
  selector: 'app-category-view',
  template: `
    <app-category-selected></app-category-selected>
  `,
  styles: [],
})
export class CategoryViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromCategories.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new categoryActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
