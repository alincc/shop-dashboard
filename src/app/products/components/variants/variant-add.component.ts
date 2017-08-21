import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { Variant, OptionType, OptionValue } from '../../models/product';

@Component({
  selector: 'app-variant-add',
  template: `
    <div *ngIf="!variant.value.saved" [formGroup]="variant">

      <div class="field">
        <label for="variant-name">Variant name</label>
        <span>E.g, <em>{{ productName || "[Product name]" }} - Red, Small</em></span>

        <input type="text" formControlName="name" placeholder="Name of the variant">
      </div>

      <div class="field">
        <label for="variant-description">Variant description</label>

        <input type="text" formControlName="description" placeholder="Description of the variant">
      </div>

      <div class="field">
        <label for="variant-sku">SKU</label>

        <input type="text" formControlName="sku" placeholder="SKU">
      </div>

      <div class="field">
        <label for="variant-quantity">Quantity</label>

        <input type="text" formControlName="stock" placeholder="Quantity available">
      </div>

      <div class="field">
        <label for="variant-description">Price</label>

        <input type="text" formControlName="price" placeholder="Price">
      </div>

      <div formArrayName="options">

        <div *ngFor="let option of variant.controls.options.controls; let i=index" [formGroupName]="i" class="field">
          <label for="option-type-name">{{ option.value.optionTypeName }}</label>

          <select (change)="onOptionChange(i, option.value, $event.target)">
            <option [value]="null" disabled>Select value</option>
            <option *ngFor="let value of option.value.values" [value]="value._id">{{ value.name }}</option>
          </select>
        </div>

      </div>

      <button type="button" class="btn btn-info btn-sm" (click)="onSave()" [disabled]="saveDisabled()">Save variant</button>
      <button type="button" class="btn btn-primary btn-sm" (click)="cancel.emit()">Cancel</button>

    </div>
  `
})
export class VariantAddComponent implements OnInit {
  @Input() variant: FormGroup;
  @Input() productName: string;
  @Input() optionTypes: OptionType[];
  @Input() existingVariants: Variant[];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  existingVariantsIds: any[] = [];

  constructor() {  }

  ngOnInit() {
    this.existingVariantsIds = this.existingVariants.map(variant => {
      return variant.options.map(option => option._id);
    });
  }

  /**
   * Change listener for options
   * @param {number}      i           Option index
   * @param {OptionValue} optionValue The option value
   * @param {any}         event       Option ID
   */
  onOptionChange(i: number, optionValue: OptionValue, event: any): void {
    const optionType = this.optionTypes.find(option => option._id == optionValue.optionTypeId);

    if (!optionType) return;

    const valueById = optionType.values.find(value => value._id == event.value)

    this.variant.controls.options['controls'][i].patchValue(valueById);
  }

  onSave(): void {
    this.variant.patchValue({
      saved: true,
    });

    this.save.emit();
  }

  saveDisabled(): boolean {
    const selectedOptionValueIds = this.variant.value.options.map(value => value._id);

    return this.existingVariantsIds.reduce((flag, combination) => {
      if (_.isEqual(combination, selectedOptionValueIds)) {
        return true;
      }

      return flag;
    }, false);
  }
}
