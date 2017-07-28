import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCategories from '../reducers';
import * as collectionActions from '../actions/collection';
import { Category } from '../../model/interface';

@Component({
  selector: 'app-category-collection',
  template: `
    <app-category-list
      [categories]="categories$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (removeSelected)="onRemoveSelected($event)">
    </app-category-list>
  `,
  styles: [],
})
export class CategoryCollectionComponent {
  categories$: Observable<Category[]>;

  constructor(private store: Store<fromCategories.State>) {
    this.categories$ = this.store.select(fromCategories.getCategoryCollection);
  }

  onCreate(category: Category): void {
    this.store.dispatch(new collectionActions.AddCategoryAction(category));
  }

  onRemove(category: Category): void {
    this.store.dispatch(new collectionActions.RemoveCategoryAction(category));
  }

  onRemoveSelected(categoryIds: string[]): void {
    this.store.dispatch(new collectionActions.RemoveManyCategoriesAction(categoryIds))
  }

}
