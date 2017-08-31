import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import * as fromProducts from '../reducers';
import * as fromLayout from '../../core/reducers/layout';
import * as layoutActions from '../../core/actions/layout';
import * as collectionActions from '../actions/collection';
import { Product } from '../../model/interface';

@Component({
  selector: 'app-product-collection',
  template: `
    <app-product-list-container
      [products]="products$ | async"
      [displayRemoved]="displayRemoved$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (restore)="onRestore($event)"
      (removeSelected)="onRemoveSelected($event)"
      (toggleDisplayRemoved)="onToggleDisplayRemoved($event)">
    </app-product-list-container>
  `,
  styles: [],
})
export class ProductCollectionComponent {
  products$: Observable<Product[]>;
  displayRemoved$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.products$ = this.store.select(fromProducts.getProductCollection);
    this.displayRemoved$ = this.store.select(fromLayout.getDisplayRemovedEntities);
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

  onToggleDisplayRemoved(): void {
    this.store.dispatch(new layoutActions.ToggleRemovedEntitiesAction());
  }

}
