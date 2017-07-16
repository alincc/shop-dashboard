import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../services';
import { Order } from '../../model/interface';

@Component({
  selector: 'app-latest-orders',
  templateUrl: './latest-orders.component.html',
  styleUrls: ['./latest-orders.component.scss']
})
export class LatestOrdersComponent implements OnInit {

  isFinished: boolean = false;
  orders: Order[] = [];
  nrOfOrders: number = 5;   // Number of orders to display
  sort: string = 'asc';     // Sorting order of the orders created date. Valid options: asc / desc

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders({ limit: this.nrOfOrders, sort: this.sort })
      .subscribe(
        orders => this.orders = orders.map(order => new Order(order)),
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

}
