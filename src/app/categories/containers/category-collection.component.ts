import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCategories from '../reducers';
import * as collectionActions from '../actions/collection';
import { Category } from '../../model/interface';
import { ConfirmationService, ToastService, CategoryService } from '../../services';

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

  constructor(
    private store: Store<fromCategories.State>,
    private toastService: ToastService,
    private categoryService: CategoryService,
  ) {
    this.categories$ = this.store.select(fromCategories.getCategoryCollection);
  }

  onCreate(category: Category): void {
    this.store.dispatch(new collectionActions.AddCategoryAction(category));
    this.toastService.success('Success!', 'The category was created');
  }

  onRemove(category: Category): void {
    this.store.dispatch(new collectionActions.RemoveCategoryAction(category));
    this.toastService.success('Removed!', 'The category was removed from the catalog');
  }

  onRemoveSelected(categories: Category[]): void {
    // TODO: use one action to delete multiple
    categories.forEach((category) => {
      this.store.dispatch(new collectionActions.RemoveCategoryAction(category))
    });

    this.toastService.success('Removed!', 'The categories was removed from the catalog');
  }

}
