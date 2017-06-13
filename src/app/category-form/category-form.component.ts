import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Category } from '../model/interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  form: FormGroup;

  formErrors = {
    name: '',
    image: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
    'image': {
      'required':      'Image is required.',
    },
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  buildForm(): void {
    if (!this.category) {
      this.category = {
        _id: '',
        name: '',
        image: '',
        products: [],
      };
    }

    this.form = this.fb.group({
      name: [this.category.name, Validators.required],
      image: this.category.image,
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
