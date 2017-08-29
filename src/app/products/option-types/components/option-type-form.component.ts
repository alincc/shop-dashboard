import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { OptionType, OptionValue } from '../../models/product';

@Component({
  selector: 'app-option-type-form',
  template: `
    <div class="option-type-form">

      <div class="panel bordered-title" *ngIf="optionType">
        <div class="options" *ngIf="!formOnly">
          <i class="fa fa-edit cursor" (click)="toggleEdit()" *ngIf="!editing"></i>
          <i class="fa fa-arrow-circle-o-left cursor" (click)="toggleEdit()" *ngIf="editing"></i>
        </div>

        <h4 class="text-thin">{{ optionType.name }}</h4>

        <div class="content">

          <div class="form-horizontal" *ngIf="!editing">

            <div class="row">

              <div class="col-xs-3 col-md-3">
                <div class="control-label">Name</div>
              </div>

              <div class="col-xs-9 col-md-9">{{ optionType.name }}</div>

              <div class="col-xs-3 col-md-3">
                <div class="control-label">Label</div>
              </div>

              <div class="col-xs-9 col-md-9">{{ optionType.label }}</div>

              <div class="col-xs-3 col-md-3">
                <div class="control-label">Values</div>
              </div>

              <div class="col-xs-9 col-md-9">{{ optionValuesAsString(optionType.values) }}</div>

            </div>

          </div>

          <form *ngIf="editing" [formGroup]="form" class="form" (ngSubmit)="onSubmit()" novalidate>

            <div class="row">

              <div class="col-md-6 col-xs-12">
                <div class="field" [ngClass]="{'error': formErrors.name}">
                  <label for="name">Name</label>
                  <input formControlName="name" placeholder="Name">

                  <div *ngIf="formErrors.name" class="errors">{{ formErrors.name }}</div>
                </div>

                <div class="field" [ngClass]="{'error': formErrors.label}">

                  <label for="label">Label</label>
                  <input formControlName="label" placeholder="Label">

                  <div *ngIf="formErrors.label" class="errors">{{ formErrors.label }}</div>
                </div>

              </div>

              <div class="col-md-offset-3 col-md-3 col-xs-12">

                <button type="button" class="btn btn-info btn-xs pull-right m-t" (click)="onAddValue()">Add value</button>

                <h3>Values</h3>

                <div class="message info m-t m-b" *ngIf="!formArrayValues.value.length">
                  No values added yet, add values in order to create the option.
                </div>

                <div *ngIf="formArrayValues.value.length">

                  <div *ngFor="let value of formArrayValues.controls; let i = index">

                    <div class="field" [formGroup]="formArrayValues.controls[i]">
                      <label for="value">Add value</label>

                      <div class="row">
                        <div class="col-md-9">
                          <input type="text" formControlName="name" placeholder="E.g. yellow"/>
                        </div>

                        <div class="col-md-3">
                          <button type="button" class="btn btn-xs btn-danger" (click)="onRemoveValue(i)">Remove</button>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            <button class="btn btn-sm btn-info btn-addon" type="submit" [disabled]="!form.valid">
              <i class="fa fa-check" *ngIf="form.valid"></i>
              <i class="fa fa-ban" *ngIf="!form.valid"></i>
              Save
            </button>

            <button type="button" class="btn btn-sm btn-default" (click)="toggleEdit()">Cancel</button>
          </form>

        </div>

      </div>

    </div>
  `,
})
export class OptionTypeFormComponent implements OnInit {
  @Input() optionType: OptionType;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmmiter: EventEmitter<any> = new EventEmitter();
  @Input() formOnly: boolean = false;

  editing: boolean = false;
  form: FormGroup;

  formErrors = {
    name: '',
    label: '',
    values: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
    'label': {
      'required':      'Label is required.',
    },
    'values': {
      'minLength':     'You need at least one value for your option.',
    },
  };

  get formArrayValues(): FormArray {
    return this.form.get('values') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

    if (this.formOnly) {
      this.editing = true;
    }
  }

  toggleEdit(): void {
    if (this.formOnly) {
      this.cancelEmmiter.emit();
    }
    else {
      this.editing = !this.editing;
    }
  }

  buildForm(): void {
    if (!this.optionType) {
      this.optionType = {
        _id: '',
        name: '',
        label: '',
        values: [],
      };
    }

    this.form = this.fb.group({
      name: [this.optionType.name, Validators.required],
      label: this.optionType.label,
      values: this.fb.array(
        this.optionType.values.map(value => this.fb.group(value)),
        Validators.compose([Validators.required, Validators.minLength(2)])
      ),
    });

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.form.value);

    if (!this.formOnly) {
      this.editing = false;
    }
  }

  onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onAddValue() {
    const value = this.fb.group({
      name: '',
      label: '',
      optionTypeName: '',
      optionTypeId: '',
      optionTypeLabel: '',
    });

    this.formArrayValues.push(value);
  }

  onRemoveValue(index: number): void {
    this.formArrayValues.removeAt(index);
  }

  optionValuesAsString(optionValues: OptionValue[]): string {
    return optionValues.map(value => value.name).join(', ');
  }

}
