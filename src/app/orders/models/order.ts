import { ShippingStatus, ShippingStatusEntry, ShippingAddress, Payment, ShippingLine, Product, Attribute, Combination } from '../../model/interface';
import { Customer } from '../../customers/models/customer';
import { Message as CustomerMessage, Thread } from '../../messages/message';

export interface IOrder {
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
  messages: CustomerMessage[]; // TODO: deprecate
  thread?: Thread;
}

export class Order implements IOrder {
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
  messages: CustomerMessage[];
  thread?: Thread;

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
    this.messages = order.messages.map(message => new CustomerMessage(message));
    this.thread = order.thread ? new Thread(order.thread) : null;
  }

  public calculateSubTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + item.getTotalPrice();
    }, 0);
  }

  public getShippingStatus(): string {
    return ShippingStatus[this.status];
  }

  public getNumberOfProducts(): number {
    return this.items.reduce((count, line) => {
      return count + line.quantity;
    }, 0);
  }
}

export class IOrderLine {
  product: Product;
  quantity: number;
  price: number;
  combination?: {
    attribute: Attribute;
    value: {
      label: string;
      value: string;
    }
  }[];
  selectedCombination?: Combination;
}

export class OrderLine implements IOrderLine {
  product: Product;
  quantity: number;
  price: number;
  combination?: {
    attribute: Attribute;
    value: {
      label: string;
      value: string;
    }
  }[];
  selectedCombination?: Combination;

  constructor(orderLine: IOrderLine) {
    this.product = new Product(orderLine.product);
    this.quantity = orderLine.quantity;
    this.price = orderLine.price;
    this.combination = orderLine.combination ? orderLine.combination : [];
    this.selectedCombination = orderLine.selectedCombination ? orderLine.selectedCombination : null;
  }

  public getTotalPrice(): number {
    return this.price * this.quantity;
  }
}

export interface AddProduct {
  order: Order;
  line: OrderLine;
}
