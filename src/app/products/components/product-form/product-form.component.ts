import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

import { AttributeService, ConfirmationService } from '../../../services';
import { CategoryService } from '../../../categories/category.service';
import { Product, Category, Attribute, Combination, IOption, ResolveEmit } from '../../../model/interface';
import { OptionType, OptionValue, Variant, ProductImage } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Input() optionTypes: OptionType[];
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<any> = new EventEmitter();
  @Output() restoreEmitter: EventEmitter<any> = new EventEmitter();

  categories: Category[];

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
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
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
        variants: [],
        optionTypes: [],
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
      variants: this.fb.array(product.variants.map(variant => this.fb.group({
        _id: variant._id,
        name: variant.name,
        description: variant.description,
        saved: true,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        options: this.fb.array(variant.options.map(option => this.fb.group({
          ...option,
          values: this.initVariantOptionValues(option.optionTypeId, option)
        }))),
      }))),
      optionTypes: this.fb.array(product.optionTypes.map(option => this.fb.group({
        _id: option._id,
        name: option.name,
        label: option.label,
        values: this.fb.array(option.values.map(value => this.fb.group(value))),
      }))),
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

  initVariantOptionValues(optionTypeId: string, option: OptionValue) {
    const optionType = this.optionTypes.find(type => type._id === option.optionTypeId);

    if (!optionType || !optionType.values) return this.fb.array([]);

    return this.fb.array(optionType.values.map(value => this.fb.group(value)));
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

    const data = {
      ...this.form.value,
      images: this.form.value.images.filter(image => image.url.length),
    }

    if (data.variants.length === 0) {
      data.variants.push(this.appendMasterVariant());
    }

    console.log(data); // TODO: remove line

    this.submitEmitter.emit(data);
    // this.buildForm(data);
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

  /**
   * Get a master variant, used in case no variants are added
   * @return {Variant} [description]
   */
  appendMasterVariant(): Variant {
    return {
      product: this.product._id,
      name: this.form.value.name,
      price: this.form.value.price,
      description: this.form.value.description,
      images: this.form.value.images,
      master: true,
      options: [],
      optionsText: '',
      stock: this.form.value.quantity,
      image: '',
      sku: '',
    }
  }

}
