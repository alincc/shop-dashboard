import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrderService, ToastService } from '../../services';
import { Order } from '../../model/interface';

@Component({
  selector: 'app-order-list-container',
  templateUrl: './order-list-container.component.html',
  styleUrls: ['./order-list-container.component.scss']
})
export class OrderListContainerComponent implements OnInit {
  selected = [];
  currentPage: number = 1;
  orders: Order[];
  isFinished: boolean = false;
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ];

  constructor(
    private orderService: OrderService,
    private toastService: ToastService,
  ) { }

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
    const list: Observable<string>[] = this.selected.map(id => this.orderService.remove(id));

    Observable.forkJoin(list)
      .subscribe(
        () => null,
        err => console.log(err),
        () => {
          this.orders = this.orders
            .filter(order => this.selected.indexOf(order._id) === -1)

          if (this.selected.length) {
            this.toastService.success('Removed!', 'The orders was removed from the catalog');
          }

          this.selected = [];
        }
      );
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

  doAction(action) {
    switch (action) {
      case 'delete':
        this.removeSelected();
        break;
    }
  }
}
