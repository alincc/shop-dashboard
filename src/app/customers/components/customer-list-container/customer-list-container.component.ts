import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ToastService } from '../../../services';
import { CustomerService } from '../../customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list-container',
  templateUrl: './customer-list-container.component.html',
  styleUrls: ['./customer-list-container.component.scss']
})
export class CustomerListContainerComponent implements OnInit {
  @Input() customers: Customer[];
  @Output() create: EventEmitter<Customer> = new EventEmitter();
  @Output() remove: EventEmitter<Customer> = new EventEmitter();
  @Output() removeSelected: EventEmitter<string[]> = new EventEmitter();
  currentPage: number = 1;
  isFinished: boolean = false;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

  constructor(
    private customerService: CustomerService,
    private toastService: ToastService,
  ) {

  }

  ngOnInit() {
  }

  onRemoveSelected(): void {
    this.removeSelected.emit(this.selected);
    this.selected = [];
  }

  onSelect(customer: Customer): void {
    const exists = this.selected.find(id => id == customer._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== customer._id);
    }
    else {
      this.selected.push(customer._id);
    }
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.onRemoveSelected();
        break;
    }
  }

}
