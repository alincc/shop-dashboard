import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { Category } from '../../../model/interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() cancelEmmiter: EventEmitter<any> = new EventEmitter();
  @Input() formOnly: boolean = false;

  editing: boolean = false;
  form: FormGroup;

  formErrors = {
    name: '',
    image: '',
    description: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
    'image': {
      'required':      'Image is required.',
    },
    'description': {
      'required':      'Description is required.',
    },
    'active': {
      'required':      'Active is required.',
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
    if (!this.category) {
      this.category = {
        _id: '',
        name: '',
        image: '',
        products: [],
        description: '',
        active: true,
      };
    }

    this.form = this.fb.group({
      name: [this.category.name, Validators.required],
      image: this.category.image,
      description: this.category.description,
      active: this.category.active,
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

  onImageAdd(event: any): void {
    this.form.patchValue({
      image: event.path,
    });
  }

}
