import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { AttributeService } from '../../../services';
import { CategoryService } from '../../../categories/category.service';
import { Product, Category, Attribute, Combination, IOption } from '../../../model/interface';
import { ProductImage } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<any> = new EventEmitter();
  @Output() restoreEmitter: EventEmitter<any> = new EventEmitter();

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

    if (!this.product) {
      this.product = new Product({
        _id: '',
        name: '',
        category: null,
        description: '',
        images: [],
        quantity: 0,
        price: 0,
        active: true,
        onSale: false,
        combinations: [],
        deleted: false,
      });
    }

    this.buildForm();
  }

  categoryOptions(): IOption[] {
    return this.categories.map(category => ({ label: category.name, value: category }));
  }

  buildForm(product: Product = this.product): void {
    this.form = this.fb.group({
      name: [product.name, Validators.required],
      price: [product.price, Validators.required],
      quantity: [product.quantity, Validators.required],
      description: [product.description, Validators.required],
      images: this.fb.array(product.images.map(image =>
        this.fb.group({
          _id: image._id,
          url: image.url,
          label: image.label,
          main: image.main,
          saved: true,
        })
      )),
      category: [product.category, Validators.required],
      active: [product.active, Validators.required],
      onSale: product.onSale,
      discount: this.fb.group({
        value: product.discount ? product.discount.value : null,
        startDate: product.discount ? [this.fullDate(new Date(product.discount.startDate))] : null,
        endDate: product.discount ? product.discount && [this.fullDate(new Date(product.discount.endDate))] : null,
      }),
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

  get formArrayImages(): FormArray {
    return this.form.get('images') as FormArray;
  };

  removeImage(index: number): void {
    this.formArrayImages.removeAt(index);
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

  onChangeDefaultImage(selectedImage): void {
    // Set default image to false on all images, except the one selected
    this.form.patchValue({
      images: this.form.controls['images'].value.map(image => ({
        ...image,
        main: (image == selectedImage) ? true : false,
      }))
    })
  }

  onSubmit(): void {
    if (this.form.value.discount && !this.form.value.discount.value) {
      this.form.value.discount = null;
    }

    this.form.value.combinations = this.form.value.combinationsGroup.combinations.filter(combination => {
      return combination.attributes.length > 0;
    });

    const data = {
      ...this.form.value,
      images: this.form.value.images.filter(image => image.url.length),
    }

    this.submitEmitter.emit(data);
    this.buildForm(data);
  }

  /**
   * Whether the form has combinations active
   * @return {boolean} True if form has combinations
   */
  hasCombinations(): boolean {
    return this.form.value.combinationsGroup.combinations.length > 0;
  }

  onRemove(soft: boolean = true): void {
    this.removeEmitter.emit(soft);
  }

  onRestore(): void {
    this.restoreEmitter.emit();
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

  onImageAdd(data: any): void {
    const image: ProductImage = {
      _id: null,
      url: data.path,
      label: '',
      main: false,
    }

    this.formArrayImages.push(this.fb.group({
      ...image,
      saved: false,
    }));
  }

}
