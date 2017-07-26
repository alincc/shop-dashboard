import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Carrier } from '../../models/carrier';

@Component({
  selector: 'app-carrier-form',
  templateUrl: './carrier-form.component.html',
  styleUrls: ['./carrier-form.component.scss']
})
export class CarrierFormComponent implements OnInit {
  @Input() carrier: Carrier;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmmiter: EventEmitter<any> = new EventEmitter();
  @Input() formOnly: boolean = false;

  editing: boolean = false;
  form: FormGroup;

  formErrors = {
    name: '',
    price: '',
    description: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
    'price': {
      'required':      'Price is required.',
      'negativeNumber': 'Price can not be a negative number',
    },
    'description': {
      'required':      'Description is required.',
    },
  };

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
    if (!this.carrier) {
      this.carrier = {
        _id: '',
        name: '',
        price: 0,
        description: '',
        active: true,
      };
    }

    this.form = this.fb.group({
      name: [this.carrier.name, Validators.required],
      price: [this.carrier.price, [
          Validators.required,
          this.negativeNumberValidator,
        ],
      ],
      description: this.carrier.description,
      active: this.carrier.active,
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

  negativeNumberValidator(control: AbstractControl) {
    if (control.value < 0) {
      return { 'negativeNumber': true };
    }
    return null;
  }
}
