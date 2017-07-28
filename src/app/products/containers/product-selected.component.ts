import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromProducts from '../reducers';
import * as productActions from '../actions/product';
import * as collectionActions from '../actions/collection';
import { Product } from '../../model/interface';
import { ProductRemove } from '../models/product';

@Component({
  selector: 'app-product-selected',
  template: `
    <app-product-detail
      [product]="product$ | async"
      (update)="onUpdate($event)"
      (restore)="onRestore($event)"
      (remove)="onRemove($event)">
    </app-product-detail>
  `,
  styles: [],
})
export class ProductSelectedComponent {
  product$: Observable<Product>;

  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.product$ = store.select(fromProducts.getSelectedProduct);
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
