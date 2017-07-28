import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ErrorResponse, Message, ShippingStatus } from '../../../model/interface';
import { ToastService } from '../../../services';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  @Input() customer: Customer;
  @Output() update: EventEmitter<Customer> = new EventEmitter();
  private errorMsg: Message;

  private ShippingStatus: typeof ShippingStatus = ShippingStatus

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  onSubmit(data) {
    data._id = this.customer._id; // TODO: fix cleaner
    this.update.emit(data);
  }

  onSubmitNote(note: string) {
    this.update.emit(this.customer);
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
