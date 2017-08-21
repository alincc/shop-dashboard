import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { OptionType } from '../../models/product';
import { ResolveEmit } from '../../../model/interface';
import { ConfirmationService } from '../../../services';

@Component({
  selector: 'app-variant-form',
  template: `
    <div [formGroup]="form">

      <div class="row">

        <div class="col-md-9 col-xs-12">

          <div>
            <h3>Existing variants</h3>

            <div *ngFor="let variant of form.value.variants">
              {{ variant.name }} <span *ngIf="!variant.saved" class="label bg-danger">Not saved</span>
            </div>

            <button type="button" class="btn btn-sm btn-info" (click)="onVariantAdd()" *ngIf="!addingVariant">
              Add new variant
            </button>
          </div>

          <div formArrayName="variants" *ngIf="addingVariant">
            <h3>Create new variant of this product</h3>

            <div *ngFor="let variant of formArrayVariants.controls; let i=index" [formGroupName]="i">

              <app-variant-add
                [variant]="formArrayVariants.controls[i]"
                [existingVariants]="formArrayVariants.value"
                [productName]="form.value.name"
                [optionTypes]="optionTypes"
                (cancel)="onCancelNewVariant($event)"
                (save)="onSaveNewVariant($event)">
              </app-variant-add>

            </div>

          </div>

        </div>

        <div class="col-md-3 col-xs-12">

          <app-added-option-types
            [optionTypes]="form.value.optionTypes"
            (remove)="onOptionTypeRemove($event)">
          </app-added-option-types>

          <app-attach-option-type
            [optionTypes]="optionTypesNotInForm()"
            (attach)="onOptionTypeAdd($event)">
          </app-attach-option-type>

        </div>

      </div>

    </div>
  `,
})
export class VariantFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() optionTypes: OptionType[];
  addingVariant: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
  }

  get formArrayVariants(): FormArray {
    return this.form.get('variants') as FormArray;
  }

  get formArrayOptionTypes(): FormArray {
    return this.form.get('optionTypes') as FormArray;
  }

  /**
   * Add new variant to the product
   */
  onVariantAdd(): void {
    // Only allow adding one variant at a time
    if (this.addingVariant) return;

    const variant = {
      _id: null,
      name: this.form.value.name,
      sku: '',
      price: this.form.value.price,
      stock: 0,
      description: this.form.value.description,
      saved: false,
      options: this.fb.array(this.form.value.optionTypes.map(option => this.fb.group({
        _id: null,
        name: '',
        label: '',
        optionTypeName: option.name,
        optionTypeId: option._id,
        optionTypeLabel: option.label,
        values: this.fb.array(option.values.map(value => this.fb.group(value))),
      }))),
    };

    this.addingVariant = true;
    this.formArrayVariants.push(this.fb.group(variant));
  }

  /**
   * Cancel adding variant
   */
  onCancelNewVariant(): void {
    const index = this.formArrayVariants.controls.findIndex(variant => variant.value.saved === false);

    this.formArrayVariants.removeAt(index);
    this.addingVariant = false;
  }

  /**
   * Save new variant
   */
  onSaveNewVariant(): void {
    this.addingVariant = false;
  }

  /**
   * Add option type to the product
   * @param {OptionType} option OptionType to add
   */
  onOptionTypeAdd(option: OptionType): void {
    const newOption = this.fb.group({
      _id: null,
      name: '',
      label: '',
      optionTypeName: option.name,
      optionTypeId: option._id,
      optionTypeLabel: option.label,
      values: this.fb.array(option.values.map(value => this.fb.group(value))),
    });

    // Check if user is currently adding a variant
    if (this.addingVariant) {
      const currentVariants = this.form
        .get('variants')['controls']
        .filter(control => control.value.saved === false);

      currentVariants.forEach(variant => {
        variant.controls.options.push(newOption);
      });
    }

    this.formArrayOptionTypes.push(this.fb.group({
      ...option,
      values: this.fb.array(option.values.map(value => this.fb.group(value))),
    }));
  }

  /**
   * Remove option type from product
   * @param {number} index OptionType index
   */
  onOptionTypeRemove(index: number): void {
    // If there are no existing variants, simply remove the type
    if (this.formArrayVariants.value.length <= 0) {
      return this.formArrayOptionTypes.removeAt(index);
    }

    this.confirmationService
      .create('Are you sure?', 'This will remove the option from all variants of this product')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          const optionTypeId = this.formArrayOptionTypes.at(index)
            && this.formArrayOptionTypes.at(index).value._id || null;

          if (!optionTypeId) return null;

          const variants = this.formArrayVariants.controls.forEach((variant, key) => {
            // Get index of option
            const optionKey = variant.value.options
              .findIndex(option => option.optionTypeId === optionTypeId);

            // Remove the option from the variant
            this.formArrayVariants.controls[key]['controls'].options.removeAt(optionKey);
          });

          // Remove option type from added option types
          this.formArrayOptionTypes.removeAt(index);
        }
      });
  }

  /**
   * Available options that have not yet been added to the product
   * @return {OptionType[]} Available, unadded options
   */
  optionTypesNotInForm(): OptionType[] {
    const addedOptionTypeIds = this.form.value.optionTypes.map(type => type._id);

    return this.optionTypes.filter(type => addedOptionTypeIds.indexOf(type._id) < 0);
  }
}
