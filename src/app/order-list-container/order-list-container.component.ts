import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services';
import { Order } from '../model/interface';

@Component({
  selector: 'app-order-list-container',
  templateUrl: './order-list-container.component.html',
  styleUrls: ['./order-list-container.component.scss']
})
export class OrderListContainerComponent implements OnInit {

  orders: Order[];
  isFinished: boolean = false;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders()
      .subscribe(
        orders => this.orders = orders.map(order => new Order(order)),
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

}
