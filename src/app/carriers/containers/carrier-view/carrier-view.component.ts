import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromCarriers from '../../reducers';
import * as carrierActions from '../../actions/carrier';

@Component({
  selector: 'app-carrier-view',
  templateUrl: './carrier-view.component.html',
  styleUrls: ['./carrier-view.component.scss']
})
export class CarrierViewComponent implements OnDestroy {

  actionsSubscription: Subscription;

   constructor(store: Store<fromCarriers.State>, route: ActivatedRoute) {
     this.actionsSubscription = route.params
       .map(params => new carrierActions.SelectAction(params.id))
       .subscribe(store);
   }

   ngOnDestroy() {
     this.actionsSubscription.unsubscribe();
   }

}
