import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ErrorResponse, Message, ShippingStatus, ShippingLine, ShippingAddress } from '../../../model/interface';
import { Order, OrderLine } from '../../models/order';

import { Customer } from '../../../customers/models/customer';
import { MessageService } from '../../../messages/message.service';
import { Message as CustomerMessage } from '../../../messages/message';
import { ToastService } from '../../../services';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  @Output() update: EventEmitter<Order> = new EventEmitter();
  @Output() addProduct: EventEmitter<any> = new EventEmitter();
  @Output() addCustomerNote: EventEmitter<any> = new EventEmitter();
  private errorMsg: Message;
  isFinished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private messageService: MessageService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  onSubmitNote(note: string) {
    this.addCustomerNote.emit(this.order.customer);
  }

  onSubmitMessage(message: CustomerMessage) {
    this.messageService.create(message) // TODO: create action and reducer
      .switchMap(res => this.orderService.addMessage(this.order._id, res.data))
      .subscribe(
        res => {
          this.order = new Order(res.data);
        },
        err => console.log(err),
      )
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
