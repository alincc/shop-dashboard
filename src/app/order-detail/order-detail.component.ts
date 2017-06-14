import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Order, ErrorResponse, Message, Customer, ShippingStatus } from '../model/interface';
import { OrderService, CustomerService, ToastService } from '../services';
import { Observable } from 'rxjs/Observable';

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
        order => {
          this.order = new Order(order);

          console.log("Order: ", this.order);
        },
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

  onUpdateStatus(status: string) {
    this.order.status = +status;

    this.orderService.update(this.order._id, this.order)
      .subscribe(
        res => this.order = new Order(res.data),
        err => console.log(err),
        () => this.toastService.success('Updated!', 'The order status was updated'),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
