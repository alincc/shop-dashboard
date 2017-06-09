import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Product } from '../model/interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  formErrors = {
    name: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    if (!this.product) {
      this.product = {
        _id: '',
        name: '',
        description: '',
        image: '',
        price: 0,
      };
    }

    this.form = this.fb.group({
      name: [this.product.name, Validators.required]
    });

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.form.value);
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
