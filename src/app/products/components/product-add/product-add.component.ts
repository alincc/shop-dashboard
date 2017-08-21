import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OptionType } from '../../models/product';
import * as fromProducts from '../../reducers';
import * as fromOptionTypes from '../../option-types/reducers';
import * as collectionActions from '../../actions/collection';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  optionTypes$: Observable<OptionType[]>

  constructor(
    private store: Store<fromProducts.State>,
  ) {
    this.optionTypes$ = store.select(fromOptionTypes.getOptionTypeCollection);
  }

  onSubmit(data) {
    console.log(data); // TODO: remove line
    this.store.dispatch(new collectionActions.AddProductAction(data));
  }
}
