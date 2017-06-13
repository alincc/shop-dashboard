import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services';
import { Customer } from '../model/interface';

@Component({
  selector: 'app-customer-list-container',
  templateUrl: './customer-list-container.component.html',
  styleUrls: ['./customer-list-container.component.scss']
})
export class CustomerListContainerComponent implements OnInit {

  customers: Customer[];
  isFinished: boolean = false;

  constructor(private customerService: CustomerService) { }

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

}
