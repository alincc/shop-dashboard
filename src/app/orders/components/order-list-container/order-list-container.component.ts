import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list-container',
  templateUrl: './order-list-container.component.html',
  styleUrls: ['./order-list-container.component.scss']
})
export class OrderListContainerComponent implements OnInit {
  @Input() orders: Order[];
  @Output() create: EventEmitter<Order> = new EventEmitter();
  @Output() remove: EventEmitter<Order> = new EventEmitter();
  @Output() removeSelected: EventEmitter<Order[]> = new EventEmitter();
  selected = [];
  currentPage: number = 1;
  isFinished: boolean = false;
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onRemoveSelected(): void {
    this.removeSelected.emit(this.selected);
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

  doAction(action) {
    switch (action) {
      case 'delete':
        this.onRemoveSelected();
        break;
    }
  }
}
