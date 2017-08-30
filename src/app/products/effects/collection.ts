import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import { ToastService } from '../../services';
import { ProductService } from '../product.service';

@Injectable()
export class CollectionEffects {
  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(collection.LOAD)
    .startWith(new collection.LoadAction())
    .switchMap(() => {
      return this.service
        .getProducts()
        .map((products: any[]) => {
          return new collection.LoadSuccessAction(products)
        })
        .catch(() => of(new collection.LoadSuccessAction([])));
    });

  @Effect()
  addProductToCollection$: Observable<Action> = this.actions$
    .ofType(collection.ADD_PRODUCT)
    .map((action: collection.AddProductAction) => action.payload)
    .switchMap((product) => {
      return this.service.createProduct(product)
        .map((newProduct) => new collection.AddProductSuccessAction(newProduct.data))
        .catch(() => of(new collection.AddProductSuccessAction(product)));
    });


  @Effect()
  removeProductFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_PRODUCT)
    .map((action: collection.RemoveProductAction) => action.payload)
    .switchMap(remove => {
      return this.service.removeProduct(remove.product._id, remove.soft)
        .map((response) => {
          return new collection.RemoveProductSuccessAction({ product: response.data, soft: remove.soft })
        })
        .catch(() => of(new collection.RemoveProductFailAction(remove.product)));
    });

  @Effect({ dispatch: false })
  removeProductSuccess$ = this.actions$
    .ofType(collection.REMOVE_PRODUCT_SUCCESS, collection.REMOVE_MANY_PRODUCTS_SUCCESS)
    .do(() => {
      this.toastService.success('Removed!', 'The product was removed from the catalog');
    });

  @Effect()
  restoreProductFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.RESTORE)
    .map((action: collection.RestoreAction) => action.payload)
    .switchMap(product => {
      return this.service.restoreProduct(product._id)
        .map((response) => new collection.RestoreSuccessAction(response.data))
        .catch(() => of(new collection.RestoreFailAction(product)));
    });

  @Effect({ dispatch: false })
  restoreProductSuccess$ = this.actions$
    .ofType(collection.RESTORE_SUCCESS)
    .do(() => {
      this.toastService.success('Product was restored!', 'The product was restored to the catalog');
    });

  @Effect({ dispatch: false })
  addProductSuccess$ = this.actions$
    .ofType(collection.ADD_PRODUCT_SUCCESS)
    .do(() => {
      this.toastService.success('Success!', 'The product was created');
      this.router.navigate(['/products']);
    });

  @Effect()
  removeManyProductsFromCollection$: Observable<Action> = this.actions$
    .ofType(collection.REMOVE_MANY_PRODUCTS)
    .map((action: collection.RemoveManyProductsAction) => action.payload)
    .switchMap(ids => {
      return this.service.removeMany(ids)
        .map(() => new collection.RemoveManyProductsSuccessAction(ids))
        .catch(() => of(new collection.RemoveManyProductsFailAction(ids)));
    });

  constructor(
    private actions$: Actions,
    private service: ProductService,
    private router: Router,
    private toastService: ToastService,
  ) {}
}
