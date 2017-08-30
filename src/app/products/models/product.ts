import { Category } from '../../model/interface';

interface Discount {
  value: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export class OptionType {
  _id: string;
  name: string;
  label: string;
  values?: OptionValue[];
}

export interface OptionValue {
  _id: string;
  name: string;
  label: string;
  optionTypeName: string;
  optionTypeId: string;
  optionTypeLabel: string;
}

export interface IVariant {
  _id?: string;
  product: string;
  name: string;
  description: string;
  sku?: string;
  options: OptionValue[];
  price: number;
  stock: number;
  optionsText: string;
  images?: ProductImage[];
  master: boolean;
}

export class Variant implements IVariant {
  _id?: string;
  product: string;
  name: string;
  description: string;
  sku?: string;
  options: OptionValue[];
  price: number;
  stock: number;
  optionsText: string;
  images?: ProductImage[];
  master: boolean;

  constructor (variant: IVariant) {
    this._id = variant._id;
    this.product = variant.product ? variant.product : null;
    this.name = variant.name;
    this.description = variant.description;
    this.sku = variant.sku;
    this.options = variant.options;
    this.price = variant.price;
    this.stock = variant.stock;
    this.optionsText = variant.optionsText;
    this.images = variant.images;
    this.master = variant.master ? variant.master : false;
  }

  /**
   * Get the default image for the product
   * @return {string} Image path as string
   */
  public get image(): string {
    if (this.images.length <= 0) {
      return null;
    }

    const defaultImage = this.images.find(image => image.main === true);

    return defaultImage ? defaultImage.url : this.images[0].url;
  }
}

export interface ProductRemove {
  product: Product;
  soft: boolean;
}

export interface ProductImage {
  _id: string;
  url: string;
  label: string;
  main: boolean;
  createdAt?: string;
}

export interface IProduct {
  _id: string;
  category?: Category;
  category_id?: String;
  name: String;
  description: String;
  images?: ProductImage[];
  quantity?: number;
  price: number;
  active: boolean;
  onSale: boolean;
  discount?: Discount;
  variants: Variant[];
  deleted?: boolean;
  optionTypes: OptionType[];
}

export class Product implements IProduct {
  _id: string;
  category?: Category;
  category_id?: String;
  name: String;
  description: String;
  images?: ProductImage[];
  quantity?: number;
  price: number;
  active: boolean;
  onSale: boolean;
  discount?: Discount;
  variants: Variant[];
  deleted?: boolean = false;
  optionTypes: OptionType[];

  constructor (product: IProduct) {
    this._id = product._id;
    this.category = product.category;
    this.category_id = product.category_id;
    this.name = product.name;
    this.description = product.description;
    this.images = product.images;
    this.quantity = product.quantity;
    this.price = product.price;
    this.active = product.active;
    this.onSale = product.onSale;
    this.discount = product.discount;
    this.variants = product.variants ? product.variants : [];
    this.optionTypes = product.optionTypes ? product.optionTypes : [];
    this.deleted = product.deleted ? product.deleted : false;
  }

  /**
   * Get active discount if exists and current
   * date is between the start and end date
   * @return {Discount}   Active discount
   */
  public getActiveDiscount(): Discount {
    if (!this.discount) {
      return null;
    }

    if (this.discount.value <= 0 ||
      this.discount.startDate === null ||
      this.discount.endDate === null
    ) {
      return null;
    }

    const currentDate = new Date();

    if (currentDate > new Date(this.discount.startDate) && currentDate < new Date(this.discount.endDate)) {
      return this.discount;
    }
    return null;
  }

  /**
   * Get the active price
   * Return original price if no discount,
   * else return the discounted price
   * @return {number}   Current price
   */
  public getCurrentPrice(): number {
    if (!this.getActiveDiscount()) {
      return this.price;
    }

    return this.price - ((this.price * this.getActiveDiscount().value) / 100);
  }

  /**
   * Get the default image for the product
   * @return {string} Image path as string
   */
  public get image(): string {
    if (this.images.length <= 0) {
      return null;
    }

    const defaultImage = this.images.find(image => image.main === true);

    return defaultImage ? defaultImage.url : this.images[0].url;
  }

  /**
   * TODO: deprecate
   * Get the quantity of the product
   * @return {number} Product quantity
   */
  public getQuantity(): number {
    return this.quantity;
  }
}
