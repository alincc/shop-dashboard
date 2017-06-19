import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../services';
import { Order } from '../../model/interface';

@Component({
  selector: 'app-order-list-container',
  templateUrl: './order-list-container.component.html',
  styleUrls: ['./order-list-container.component.scss']
})
export class OrderListContainerComponent implements OnInit {
  selected = [];
  selectedActionOption: string;
  currentPage: number = 1;
  orders: Order[];
  isFinished: boolean = false;
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

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

  removeSelected(): void {
    this.selected.forEach(id => {
      this.orderService.remove(id)
        .subscribe(
          () => {
            this.orders = this.orders.filter(order => order._id !== id);
          },
          err => console.log(err),
        )
    });

    this.selected = [];
  }

  onSelect(order: Order): void {
    const exists = this.selected.find(id => id == order._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== order._id);
    }
    else {
      this.selected.push(order._id);
    }
  }

  doAction() {
    switch (this.selectedActionOption) {
      case 'delete':
        this.removeSelected();
        break;
    }
  }
}
