import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable, InjectionToken } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as customerActions from '../actions/customer';
import { CustomerService } from '../customer.service';
import { ToastService } from '../../services';

@Injectable()
export class CustomerEffects {
  @Effect()
  saveCustomer$: Observable<Action> = this.actions$
    .ofType(customerActions.SAVE)
    .map((action: customerActions.SaveAction) => action.payload)
    .switchMap((customer) => {
      return this.service.update(customer._id, customer)
        .map((newCustomer) => new customerActions.SaveSuccessAction(newCustomer.data))
        .catch(() => of(new customerActions.SaveFailAction(customer)));
    })

  @Effect({ dispatch: false })
  saveCustomerSuccess$ = this.actions$
    .ofType(customerActions.SAVE_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The customer information was updated');
    });

  constructor(
    private actions$: Actions,
    private service: CustomerService,
    private toastService: ToastService,
  ) {}
}
