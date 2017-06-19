export interface IOption {
  value: any;
  label: string;
  disabled?: boolean;
}

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

class IOrderLine {
  product: Product;
  quantity: number;
  price: number;
}

class OrderLine implements IOrderLine {
  product: Product;
  quantity: number;
  price: number;

  constructor(orderLine: IOrderLine) {
    this.product = orderLine.product;
    this.quantity = orderLine.quantity;
    this.price = orderLine.price;
  }

  public getTotalPrice(): number {
    return this.price * this.quantity;
  }
}

export enum ShippingStatus {
  Pending = 0,
  AwaitingShipment = 1,
  Shipped = 2,
  Completed = 4,
}

interface IShippingStatusEntry {
  _id: string;
  createdAt: string;
  status: number;
}

class ShippingStatusEntry {
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
    public value: Shipping,
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

interface IOrder {
  _id: string;
  updatedAt: String;
  createdAt: String;
  total: number;
  status?: ShippingStatus;
  statusLog: ShippingStatusEntry[];
  items: OrderLine[];
  customer?: Customer; // TODO: should not be optional
  // shipping?: Shipping;
  shipping?: ShippingLine;
  shippingAddress?: ShippingAddress;
  payment?: Payment;
}

class Order implements IOrder {
  _id: string;
  updatedAt: String;
  createdAt: String;
  total: number;
  status?: ShippingStatus;
  statusLog: ShippingStatusEntry[];
  items: OrderLine[];
  customer?: Customer; // TODO: should not be optional
  shipping?: ShippingLine;
  shippingAddress?: ShippingAddress;
  payment?: Payment;

  constructor(order: IOrder) {
    this._id = order._id;
    this.updatedAt = order.updatedAt;
    this.createdAt = order.createdAt;
    this.total = order.total;
    this.status = order.status;
    this.statusLog = order.statusLog.map(item => new ShippingStatusEntry(item));
    this.items = order.items ? order.items.map(item => new OrderLine(item)) : [];
    this.customer = order.customer ? new Customer(order.customer) : null;
    this.shipping = order.shipping ? order.shipping : null;
    this.payment = order.payment ? order.payment : null;
    this.shippingAddress = order.shippingAddress ? new ShippingAddress(order.shippingAddress) : null;
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
  _id: string;
  name: string;
  price: number;
  description?: string;
  active: boolean;
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
