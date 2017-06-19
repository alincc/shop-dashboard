import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CustomerService, ToastService } from '../../services';
import { Customer } from '../../model/interface';

@Component({
  selector: 'app-customer-list-container',
  templateUrl: './customer-list-container.component.html',
  styleUrls: ['./customer-list-container.component.scss']
})
export class CustomerListContainerComponent implements OnInit {
  currentPage: number = 1;
  customers: Customer[];
  isFinished: boolean = false;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

  constructor(
    private customerService: CustomerService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getAll()
      .subscribe(
        customers => this.customers = customers.map(customer => new Customer(customer)),
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

  removeSelected(): void {
    const list: Observable<string>[] = this.selected.map(id => this.customerService.remove(id));

    Observable.forkJoin(list)
      .subscribe(
        () => null,
        err => console.log(err),
        () => {
          this.customers = this.customers
            .filter(customer => this.selected.indexOf(customer._id) === -1)

          if (this.selected.length) {
            this.toastService.success('Removed!', 'The customers was removed from the catalog');
          }

          this.selected = [];
        }
      );
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
        this.removeSelected();
        break;
    }
  }

}
