import { Message as CustomerMessage } from '../messages/message';
import { Carrier } from '../carriers/models/carrier';
import { Customer } from '../customers/models/customer';
import { Product, Variant, ProductImage } from '../products/models/product';

export interface IOption {
  value: any;
  label: string;
  disabled?: boolean;
}

interface IUser {
  _id: String,
  admin: boolean;
  username: String;
  password: String;
  email: string;
  customer?: Customer;
  ip: String;
  image?: string;
}

class User implements IUser {
  _id: String;
  admin: boolean;
  username: String;
  password: String;
  email: string;
  customer?: Customer;
  ip: String;
  image?: string;

  constructor(user: IUser) {
    this._id = user._id;
    this.admin = user.admin;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.customer = user.customer ? user.customer : null;
    this.ip = user.ip;
    this.image = user.image ? user.image : 'no-pic.png';
  }

  public getImagePath(): string {
    return 'assets/img/' + this.image;
  }
}

interface ICategory {
  _id: string;
  name: string;
  image: string;
  products: Product[],
  description: string;
  active: boolean;
}

class Category implements ICategory {
  _id: string;
  name: string;
  image: string;
  products: Product[];
  description: string;
  active: boolean;

  constructor(category: ICategory) {
    this._id = category._id;
    this.name = category.name;
    this.image = category.image;
    this.products = category.products;
    this.description = category.description;
    this.active = category.active;
  }
}

interface CartProduct {
  product: Product;
  quantity: number;
}

class Payment {
  _id: string;
  name: string;
  image?: string;
  active: boolean;
}

class Message {
  constructor(public type: string, public message: string, public title?: string) { }
}

interface ErrorResponse {
  status: number;
  message: string;
  data: any;
}

interface SuccessResponse {
  status: number;
  message: string;
  data: any;
}

export interface ResolveEmit {
    // Returns this if modal resolved with yes or no
    resolved?: boolean;
    // If the modal was closed in some other way this is removed
    closedWithOutResolving?: string;
}

class ContactMessage {
  constructor(public name: String, public email: String, public message: String) { }
}

export class DropdownValue {
  value: string;
  label: string;

  constructor(value:string, label:string) {
    this.value = value;
    this.label = label;
  }
}

export enum ShippingStatus {
  Pending = 0,
  AwaitingShipment = 1,
  Shipped = 2,
  Completed = 4,
}

export interface IShippingStatusEntry {
  _id: string;
  createdAt: string;
  status: number;
}

export class ShippingStatusEntry {
  _id: string;
  createdAt: string;
  status: number;

  constructor(shippingStatusEntry: IShippingStatusEntry) {
    this._id = shippingStatusEntry._id;
    this.createdAt = shippingStatusEntry.createdAt;
    this.status = shippingStatusEntry.status;
  }

  public getShippingStatus(): string {
    return ShippingStatus[this.status];
  }
}

export class ShippingLine {
  constructor(
    public value: Carrier,
    public trackingNumber: string,
    public price: number,
    public weight: number,
  ) { }
}

export class IShippingAddress {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  postnumber: string;
  address: string;
  country: string;
  city: string;
}

export class ShippingAddress {
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  postnumber: string;
  address: string;
  country: string;
  city: string;

  constructor(shippingAddress: IShippingAddress) {
    this.email = shippingAddress.email;
    this.phone = shippingAddress.phone;
    this.firstname = shippingAddress.firstname;
    this.lastname = shippingAddress.lastname;
    this.postnumber = shippingAddress.postnumber;
    this.address = shippingAddress.address;
    this.country = shippingAddress.country;
    this.city = shippingAddress.city;
  }

  public getFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}

export interface ICombination {
  quantity: number;
  attributes: [{
    attribute: Attribute,
    value: AttributeValue,
  }];
  _id?: string;
}

export class Combination implements ICombination {
  quantity: number;
  attributes: [{
    attribute: Attribute,
    value: AttributeValue,
  }];
  _id?: string;

  constructor(combination: ICombination) {
    this._id = combination._id;
    this.quantity = combination.quantity;
    this.attributes = combination.attributes;
  }

  public valuesToString(): string {
    return this.attributes.map(attribute => attribute.value.label).join(', ');
  }
}

export interface AttributeValue {
  label: string;
  value: string;
}

export class Attribute {
  constructor(
    public name: string,
    public values: AttributeValue[],
    public _id?: string,
  ) {}
}

export interface AttributeLineValue {
  value: string;
  label: string;
  quantity: number;
}

export class AttributeLine {
  constructor(
    public attribute: Attribute,
    public values: AttributeLineValue[],
  ) {}
}


export {
  Category,
  CartProduct,
  ContactMessage,
  Payment,
  Message,
  ErrorResponse,
  SuccessResponse,
  User,
  Product,
}
