import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Customer } from '../model/interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;

  form: FormGroup;

  formErrors = {
    firstname: '',
  };

  validationMessages = {
    'firstname': {
      'required':      'Firstname is required.',
    },
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    if (!this.customer) {
      this.customer = new Customer({
        _id: '',
        firstname: '',
        lastname: '',
        phone: '',
        country: '',
        email: '',
        postnumber: '',
        city: '',
        address: '',
        orders: [],
        active: true,
      });
    }

    this.form = this.fb.group({
      firstname: [this.customer.firstname, Validators.required],
    });

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.form.value);
  }

  toggleEdit() {
    this.editing = !this.editing;
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

}
