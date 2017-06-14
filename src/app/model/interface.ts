interface User {
  _id: String,
  admin: boolean;
  username: String;
  password: String;
  email: string;
  customer?: Customer;
  ip: String;
}

interface ICategory {
  _id: string;
  name: string;
  image: string;
  products: Product[],
}

class Category implements ICategory {
  _id: string;
  name: string;
  image: string;
  products: Product[];

  constructor(category: ICategory) {
    this._id = category._id;
    this.name = category.name;
    this.image = category.image;
    this.products = category.products;
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

class ICustomer {
  _id?: string;
  phone: String;
  country: String;
  email: string;
  postnumber: String;
  city: String;
  address: String;
  lastname: String;
  firstname: String;
  orders: Order[];
  active?: boolean;
  note?: string;
}
class Customer implements ICustomer {
  _id?: string;
  phone: String;
  country: String;
  email: string;
  postnumber: String;
  city: String;
  address: String;
  lastname: String;
  firstname: String;
  orders: Order[];
  active?: boolean;
  note?: string;

  constructor(customer: ICustomer) {
    this._id = customer._id;
    this.phone = customer.phone;
    this.country = customer.country;
    this.email = customer.email;
    this.postnumber = customer.postnumber;
    this.city = customer.city;
    this.address = customer.address;
    this.lastname = customer.lastname;
    this.firstname = customer.firstname;
    this.orders = customer.orders;
    this.active = customer.active ? customer.active : true;
    this.note = customer.note;
  }

  public differs(other: Customer): boolean {
    if (this.phone !== other.phone ||
      this.country !== other.country ||
      this.email !== other.email ||
      this.postnumber !== other.postnumber ||
      this.city !== other.city ||
      this.address !== other.address ||
      this.lastname !== other.lastname ||
      this.firstname !== other.firstname
    ) {
      return true;
    }

    return false;
  }

  public getFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  public getStatus(): string {
    return this.active ? 'Enabled' : 'Disabled';
  }
}

interface OrderLine {
  product: Product;
  quantity: number;
}

export enum ShippingStatus {
  Pending = 0,
  AwaitingShipment = 1,
  Shipped = 2,
  Completed = 4,
}

interface IOrder {
  _id: string;
  updatedAt: String;
  createdAt: String;
  total: number;
  status?: ShippingStatus;
  items: OrderLine[];
  customer?: Customer; // TODO: should not be optional
  shipping?: Shipping;
  payment?: Payment;
}

class Order implements IOrder {
  _id: string;
  updatedAt: String;
  createdAt: String;
  total: number;
  status?: ShippingStatus;
  items: OrderLine[];
  customer?: Customer; // TODO: should not be optional
  shipping?: Shipping;
  payment?: Payment;

  constructor(order: IOrder) {
    this._id = order._id;
    this.updatedAt = order.updatedAt;
    this.createdAt = order.createdAt;
    this.total = order.total;
    this.status = order.status;
    this.items = order.items ? order.items : [];
    this.customer = order.customer ? new Customer(order.customer) : null;
    this.shipping = order.shipping ? order.shipping : null;
    this.payment = order.payment ? order.payment : null;
  }

  public calculateSubTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  public getShippingStatus(): string {
    return ShippingStatus[this.status];
  }
}

class Product {
  _id: string;
  category?: Category;
  category_id?: String;
  name: String;
  description: String;
  image: String;
  quantity?: number;
  price: number;
  active: boolean;
}

class Shipping {
  _id: String;
  name: String;
  price: Number;
  description?: String;
}

export {
  Category,
  CartProduct,
  ContactMessage,
  Payment,
  Customer,
  Message,
  ErrorResponse,
  SuccessResponse,
  OrderLine,
  IOrder,
  Order,
  User,
  Shipping,
  Product,
}
