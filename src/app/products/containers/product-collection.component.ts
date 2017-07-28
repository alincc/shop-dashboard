import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromProducts from '../reducers';
import * as collectionActions from '../actions/collection';
import { Product } from '../../model/interface';

@Component({
  selector: 'app-product-collection',
  template: `
    <app-product-list-container
      [products]="products$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (restore)="onRestore($event)"
      (removeSelected)="onRemoveSelected($event)">
    </app-product-list-container>
  `,
  styles: [],
})
export class ProductCollectionComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProducts.State>) {
    this.products$ = this.store.select(fromProducts.getProductCollection);
  }

  onCreate(product: Product): void {
    this.store.dispatch(new collectionActions.AddProductAction(product));
  }

  onRemove(product: Product): void {
    this.store.dispatch(new collectionActions.RemoveProductAction({ product: product, soft: true }));
  }

  onRestore(product: Product): void {
    this.store.dispatch(new collectionActions.RestoreAction(product));
  }

  onRemoveSelected(productIds: string[]): void {
    this.store.dispatch(new collectionActions.RemoveManyProductsAction(productIds))
  }

}
