import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCarriers from '../../reducers';
import * as collectionActions from '../../actions/collection';
import { Carrier } from '../../models/carrier';

@Component({
  selector: 'app-carrier-collection',
  templateUrl: './carrier-collection.component.html',
  styleUrls: ['./carrier-collection.component.scss']
})
export class CarrierCollectionComponent {
  carriers$: Observable<Carrier[]>;

  constructor(private store: Store<fromCarriers.State>) {
    this.carriers$ = this.store.select(fromCarriers.getCarrierCollection);
  }

  onCreate(carrier: Carrier): void {
    this.store.dispatch(new collectionActions.AddShippingAction(carrier));
  }

  onRemove(carrier: Carrier): void {
    this.store.dispatch(new collectionActions.RemoveShippingAction(carrier));
  }

  onRemoveSelected(carriers: Carrier[]): void {
    const ids = carriers.map(carrier => carrier._id);

    this.store.dispatch(new collectionActions.RemoveManyShippingAction(ids))
  }

}
