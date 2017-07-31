import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromThreads from '../reducers';
import * as threadActions from '../actions/thread';

@Component({
  selector: 'app-thread-view',
  template: `
    <app-thread-selected></app-thread-selected>
  `,
  styles: [],
})
export class ThreadViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromThreads.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new threadActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
