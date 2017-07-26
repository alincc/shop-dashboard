import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCarriers from '../../reducers';
import * as carrierActions from '../../actions/carrier';
import { Carrier } from '../../models/carrier';
import { ToastService } from '../../../services';

@Component({
  selector: 'app-carrier-selected',
  templateUrl: './carrier-selected.component.html',
  styleUrls: ['./carrier-selected.component.scss']
})
export class CarrierSelectedComponent {
  carrier$: Observable<Carrier>;

  constructor(
    private store: Store<fromCarriers.State>,
    private toastService: ToastService,
  ) {
    this.carrier$ = store.select(fromCarriers.getSelectedCarrier);
  }

  onUpdate(carrier: Carrier): void {
    this.store.dispatch(new carrierActions.SaveAction(carrier));
    this.toastService.success('Saved!', 'The carrier was updated');
  }

}
