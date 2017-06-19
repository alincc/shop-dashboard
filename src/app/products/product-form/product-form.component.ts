import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { CategoryService } from '../../services';
import { Product, Category, IOption } from '../../model/interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<any> = new EventEmitter();

  categories: Category[];

  activeTab: string = 'basic';

  form: FormGroup;

  formErrors = {
    name: '',
    price: '',
    quantity: '',
    description: '',
    category: '',
    image: '',
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
    },
    'price': {
      'required':      'Price is required',
    },
    'quantity': {
      'required':      'Quantity is required',
    },
    'description': {
      'required':      'Description is required',
    },
    'image': {
      'required':      'Image is required',
    },
    'category': {
      'required':      'Category is required',
    },
  };

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        err => console.log(err),
      );
    this.buildForm();
  }

  categoryOptions(): IOption[] {
    return this.categories.map(category => ({ label: category.name, value: category }));
  }

  buildForm(): void {
    if (!this.product) {
      this.product = {
        _id: '',
        name: '',
        category: null,
        description: '',
        image: '',
        quantity: 0,
        price: 0,
        active: true,
        onSale: false,
      };
    }

    this.form = this.fb.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      quantity: [this.product.quantity, Validators.required],
      description: [this.product.description, Validators.required],
      image: [this.product.image, Validators.required],
      category: [this.product.category, Validators.required],
      active: [this.product.active, Validators.required],
      onSale: this.product.onSale,
    });

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.form.value);
  }

  onRemove(): void {
    this.removeEmitter.emit();
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

  setTab(tab: string) {
    this.activeTab = tab;
  }

}
