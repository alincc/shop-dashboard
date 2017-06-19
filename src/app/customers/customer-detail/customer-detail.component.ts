import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Customer, ErrorResponse, Message, ShippingStatus } from '../../model/interface';
import { CustomerService, ToastService } from '../../services';
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
    private toastService: ToastService,
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
        () => this.toastService.success('Saved!', 'The customer information was updated'),
      );
  }

  onSubmitNote(note: string) {
    this.customerService.update(this.customer._id, this.customer)
      .subscribe(
        res => this.customer = new Customer(res.data),
        err => console.log(err),
        () => this.toastService.success('Note saved!', 'The customer note was saved'),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
