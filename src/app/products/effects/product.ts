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

import * as productActions from '../actions/product';
import { ProductService } from '../product.service';
import { ToastService } from '../../services';

@Injectable()
export class ProductEffects {
  @Effect()
  saveProduct$: Observable<Action> = this.actions$
    .ofType(productActions.SAVE)
    .map((action: productActions.SaveAction) => action.payload)
    .switchMap((product) => {
      return this.service.updateProduct(product._id, product)
        .map((newProduct) => new productActions.SaveSuccessAction(newProduct.data))
        .catch(() => of(new productActions.SaveFailAction(product)));
    })

  @Effect({ dispatch: false })
  saveProductSuccess$ = this.actions$
    .ofType(productActions.SAVE_SUCCESS)
    .do(() => {
      this.toastService.success('Saved!', 'The product was updated');
    });

  constructor(
    private actions$: Actions,
    private service: ProductService,
    private toastService: ToastService,
  ) {}
}
