import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services';
import { Order } from '../model/interface';

@Component({
  selector: 'app-latest-orders',
  templateUrl: './latest-orders.component.html',
  styleUrls: ['./latest-orders.component.scss']
})
export class LatestOrdersComponent implements OnInit {

  isFinished: boolean = false;
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders()
      .subscribe(
        orders => this.orders = orders,
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

}
