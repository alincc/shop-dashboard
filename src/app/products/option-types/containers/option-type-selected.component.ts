import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromOptionTypes from '../reducers';
import * as optionTypeActions from '../actions/option-type';
import { OptionType } from '../../models/product';
import { ToastService } from '../../../services';

@Component({
  selector: 'app-option-type-selected',
  template: `
    <app-option-type-detail
      [optionType]="optionType$ | async"
      (update)="onUpdate($event)">
    </app-option-type-detail>
  `,
  styles: [],
})
export class OptionTypeSelectedComponent {
  optionType$: Observable<OptionType>;

  constructor(
    private store: Store<fromOptionTypes.State>,
    private toastService: ToastService,
  ) {
    this.optionType$ = store.select(fromOptionTypes.getSelectedOptionType);
  }

  onUpdate(optionType: OptionType): void {
    this.store.dispatch(new optionTypeActions.SaveAction(optionType));
    this.toastService.success('Saved!', 'The option type was updated');
  }

}
