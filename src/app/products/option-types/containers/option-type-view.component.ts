import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromOptionTypes from '../reducers';
import * as optionTypeActions from '../actions/option-type';

@Component({
  selector: 'app-optionType-view',
  template: `
    <app-option-type-selected></app-option-type-selected>
  `,
  styles: [],
})
export class OptionTypeViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromOptionTypes.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new optionTypeActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
