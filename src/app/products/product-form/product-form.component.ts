import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { CategoryService, AttributeService } from '../../services';
import { Product, Category, Attribute, Combination, IOption } from '../../model/interface';

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
  attributes: Attribute[];
  selectedCombinations: Combination[] = [];

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
    private attributeService: AttributeService,
  ) { }

  ngOnInit() {
    this.loadAttributes();
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
      this.product = new Product({
        _id: '',
        name: '',
        category: null,
        description: '',
        image: '',
        quantity: 0,
        price: 0,
        active: true,
        onSale: false,
        combinations: [],
      });
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

      discount: this.fb.group({
        value: this.product.discount.value,
        startDate: [this.fullDate(new Date(this.product.discount.startDate))],
        endDate: [this.fullDate(new Date(this.product.discount.endDate))],
      }),
      // combinations: this.fb.array(
      //   this.initCombinations(),
      // ),
      combinationsGroup: this.fb.group({
        combinations: this.fb.array(
          this.initCombinations(),
        ),
      }),
    });

    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  initCombinations() {
    return this.product.combinations.map(combination =>
      this.fb.group({
        quantity: combination.quantity,
        attributes: this.fb.array(combination.attributes.map(attribute => (
          this.fb.group({
            attribute: attribute.attribute,
            value: attribute.value,
          })
        ))),
      })
    );
  }

  fullDate(dateIn) {
    const date = new Date(dateIn);

    const month = ('0' + (date.getMonth()+1) ).slice(-2);

    const dateString = date.getFullYear() + '-'
      + ('0' + (date.getMonth()+1)).slice(-2) + '-'
      + ('0' + date.getDate()).slice(-2);

    return dateString;
  }

  onSubmit(): void {
    this.form.value.combinations = this.form.value.combinationsGroup.combinations.filter(combination => {
      return combination.attributes.length > 0;
    });

    this.submitEmitter.emit(this.form.value);
  }

  /**
   * Whether the form has combinations active
   * @return {boolean} True if form has combinations
   */
  hasCombinations(): boolean {
    return this.form.value.combinationsGroup.combinations.length > 0;
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

  loadAttributes(): void {
    this.attributeService.getAll()
      .subscribe(
        attributes => this.attributes = attributes,
        err => console.log(err),
      );
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

}
