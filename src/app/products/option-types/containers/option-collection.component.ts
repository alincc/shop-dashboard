import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromOptionTypes from '../reducers';
import * as optionActions from '../actions/option-type';
import * as collectionActions from '../actions/collection';
import { OptionType } from '../../models/product';

@Component({
  selector: 'app-option-collection',
  template: `
    <app-option-type-list
      [optionTypes]="optionTypes$ | async"
      (create)="onCreate($event)"
      (remove)="onRemove($event)"
      (removeSelected)="onRemoveSelected($event)">
    </app-option-type-list>
  `,
})
export class OptionCollectionComponent implements OnInit {
  optionTypes$: Observable<OptionType[]>;

  constructor(private store: Store<fromOptionTypes.State>) {
    this.optionTypes$ = this.store.select(fromOptionTypes.getOptionTypeCollection)
  }

  ngOnInit() {}

  onCreate(optionType: OptionType): void {
    this.store.dispatch(new collectionActions.AddOptionTypeAction(optionType));
  }

  onRemove(optionType: OptionType): void {
    this.store.dispatch(new collectionActions.RemoveOptionTypeAction(optionType));
  }

  onRemoveSelected(optionTypeIds: string[]): void {
    // this.store.dispatch(new collectionActions.Remove(categoryIds))
    // TODO: implement
  }
}
