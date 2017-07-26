import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromCategories from '../reducers';
import * as categoryActions from '../actions/category';
import { Category } from '../../model/interface';
import { ToastService } from '../../services';

@Component({
  selector: 'app-category-selected',
  template: `
    <app-category-detail
      [category]="category$ | async"
      (update)="onUpdate($event)">
    </app-category-detail>
  `,
  styles: [],
})
export class CategorySelectedComponent {
  category$: Observable<Category>;

  constructor(
    private store: Store<fromCategories.State>,
    private toastService: ToastService,
  ) {
    this.category$ = store.select(fromCategories.getSelectedCategory);
  }

  onUpdate(category: Category): void {
    this.store.dispatch(new categoryActions.SaveAction(category));
    this.toastService.success('Saved!', 'The category was updated');
  }

}
