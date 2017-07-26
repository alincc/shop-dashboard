import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCarriers from '../../reducers';
import * as collectionActions from '../../actions/collection';
import { CarrierService } from '../../carrier.service';
import { Carrier } from '../../models/carrier';
import { ConfirmationService, ToastService } from '../../../services';

@Component({
  selector: 'app-carrier-collection',
  templateUrl: './carrier-collection.component.html',
  styleUrls: ['./carrier-collection.component.scss']
})
export class CarrierCollectionComponent {
  carriers$: Observable<Carrier[]>;

  constructor(
    private store: Store<fromCarriers.State>,
    private toastService: ToastService,
    private carrierService: CarrierService,
  ) {
    this.carriers$ = this.store.select(fromCarriers.getCarrierCollection);
  }

  onCreate(carrier: Carrier): void {
    this.store.dispatch(new collectionActions.AddShippingAction(carrier));
    this.toastService.success('Success!', 'The carrier was created');
  }

  onRemove(carrier: Carrier): void {
    this.store.dispatch(new collectionActions.RemoveShippingAction(carrier));
    this.toastService.success('Removed!', 'The carrier was removed from the catalog');
  }

  onRemoveSelected(carriers: Carrier[]): void {
    // TODO: use one action to delete multiple
    carriers.forEach((carrier) => {
      this.store.dispatch(new collectionActions.RemoveShippingAction(carrier))
    });

    this.toastService.success('Removed!', 'The carriers was removed from the catalog');
  }

}
