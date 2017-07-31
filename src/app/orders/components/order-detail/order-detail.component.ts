import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ErrorResponse, Message, ShippingStatus, ShippingLine, ShippingAddress } from '../../../model/interface';
import { Order, OrderLine } from '../../models/order';
import { Customer } from '../../../customers/models/customer';
import { Message as CustomerMessage, AddMessage, Thread } from '../../../messages/message';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  @Input() thread: Thread;
  @Output() update: EventEmitter<Order> = new EventEmitter();
  @Output() addProduct: EventEmitter<any> = new EventEmitter();
  @Output() addCustomerNote: EventEmitter<any> = new EventEmitter();
  @Output() addMessage: EventEmitter<{ addMessage: AddMessage, order: Order }> = new EventEmitter();
  private errorMsg: Message;
  isFinished: boolean = false;

  constructor(
  ) { }

  ngOnInit() {
  }

  onSubmitNote(note: string) {
    this.addCustomerNote.emit(this.order.customer);
  }

  onSubmitMessage(message: CustomerMessage) {
    const threadId = this.order.thread ? this.order.thread._id : null;
    this.addMessage.emit({ addMessage: { threadId, message }, order: this.order });
  }

  onUpdateProducts(items: OrderLine[]) {
    this.onUpdate({ items: items });
  }

  onUpdateStatus(status: any) {
    this.onUpdate(status)
  }

  onUpdateAddress(address: ShippingAddress) {
    this.onUpdate({ shippingAddress: address });
  }

  onUpdate(body: any) {
    body._id = this.order._id;
    this.update.emit(body);
  }

  onAddProduct(line: OrderLine): void {
    this.addProduct.emit({ order: this.order, line });
  }

  onRemoveProduct(line: OrderLine): void {
    this.onUpdate({ items: this.order.items.filter(item => line != item) });
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
