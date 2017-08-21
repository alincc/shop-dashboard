import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromProducts from '../reducers';
import * as fromRoot from '../../reducers';
import * as fromOptionTypes from '../option-types/reducers';
import * as productActions from '../actions/product';
import * as collectionActions from '../actions/collection';
import { Product } from '../../model/interface';
import { OptionType, ProductRemove } from '../models/product';

@Component({
  selector: 'app-product-selected',
  template: `
    <app-product-detail
      [product]="product$ | async"
      [optionTypes]="optionTypes$ | async"
      (update)="onUpdate($event)"
      (restore)="onRestore($event)"
      (remove)="onRemove($event)">
    </app-product-detail>
  `,
  styles: [],
})
export class ProductSelectedComponent {
  product$: Observable<Product>;
  optionTypes$: Observable<OptionType[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.product$ = store.select(fromProducts.getSelectedProduct);
    this.optionTypes$ = store.select(fromOptionTypes.getOptionTypeCollection);
  }

  onUpdate(product: Product): void {
    this.store.dispatch(new productActions.SaveAction(product));
  }

  onRemove(remove: ProductRemove): void {
    this.store.dispatch(new collectionActions.RemoveProductAction(remove));
  }

  onRestore(product: Product): void {
    this.store.dispatch(new collectionActions.RestoreAction(product));
  }

}
