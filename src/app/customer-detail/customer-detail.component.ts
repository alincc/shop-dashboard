import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Customer, ErrorResponse, Message, ShippingStatus } from '../model/interface';
import { CustomerService } from '../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  private errorMsg: Message;

  private ShippingStatus: typeof ShippingStatus = ShippingStatus

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.customerService.get(params['id']))
      .subscribe(
        customer => this.customer = new Customer(customer),
        err => this.handleError(err),
      );
  }

  onSubmit(data) {
    this.customerService.update(this.customer._id, data)
      .subscribe(
        res => this.customer = new Customer(res.data),
        err => console.log(err),
      );
  }

  onSubmitNote() {
    this.customerService.update(this.customer._id, this.customer)
      .subscribe(
        res => this.customer = new Customer(res.data),
        err => console.log(err),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
