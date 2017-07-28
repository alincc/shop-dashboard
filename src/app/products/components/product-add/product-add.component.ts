import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromProducts from '../../reducers';
import * as collectionActions from '../../actions/collection';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  constructor(
    private store: Store<fromProducts.State>,
  ) { }

  onSubmit(data) {
    this.store.dispatch(new collectionActions.AddProductAction(data));
  }
}
