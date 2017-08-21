import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Order, OrderLine } from '../../models/order';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss']
})
export class OrderProductListComponent implements OnInit {
  @Input() items: OrderLine[];
  @Output() updateEmitter: EventEmitter<OrderLine[]> = new EventEmitter();
  @Output() addEmitter: EventEmitter<OrderLine> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<OrderLine> = new EventEmitter();

  toggle = {};

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.updateEmitter.emit(this.items);
  }

  onAddProduct(line: OrderLine) {
    this.addEmitter.emit(line);
  }
  onRemoveProduct(line: OrderLine) {
    this.removeEmitter.emit(line);
  }

  priceDiffers(line: OrderLine): boolean {
    return line.price !== line.variant.price;
  }

  priceIncreased(line: OrderLine): boolean {
    return line.price > line.variant.price
  }

  priceDecreased(line: OrderLine): boolean {
    return line.price < line.variant.price
  }

}
