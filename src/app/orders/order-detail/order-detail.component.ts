import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Order, OrderLine, ErrorResponse, Message, Customer, ShippingStatus, ShippingLine, ShippingAddress } from '../../model/interface';
import { OrderService, CustomerService, ToastService } from '../../services';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  private errorMsg: Message;
  isFinished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private customerService: CustomerService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.orderService.get(params['id']))
      .subscribe(
        order => this.order = new Order(order),
        err => this.handleError(err),
      );
  }

  onSubmitNote(note: string) {
    this.customerService.update(this.order.customer._id, this.order.customer)
      .subscribe(
        res => this.order.customer = new Customer(res.data),
        err => console.log(err),
        () => this.toastService.success('Note saved!', 'The customer note was saved'),
      );
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
    this.orderService.update(this.order._id, body)
      .subscribe(
        res => this.order = new Order(res.data),
        err => console.log(err),
        () => this.toastService.success('Updated!', 'The order was updated'),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}