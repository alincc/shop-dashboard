import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OrderLine } from '../model/interface';

@Component({
  selector: 'app-order-product-list',
  templateUrl: './order-product-list.component.html',
  styleUrls: ['./order-product-list.component.scss']
})
export class OrderProductListComponent implements OnInit {
  @Input() items: OrderLine[];
  @Output() updateEmitter: EventEmitter<OrderLine[]> = new EventEmitter();

  toggle = {};

  constructor() { }

  ngOnInit() {
  }

  onSave() {
    this.updateEmitter.emit(this.items);
  }

  priceDiffers(line: OrderLine): boolean {
    return line.price !== line.product.price;
  }

  priceIncreased(line: OrderLine): boolean {
    return line.price > line.product.price
  }

  priceDecreased(line: OrderLine): boolean {
    return line.price < line.product.price
  }

}
