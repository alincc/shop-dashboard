import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, ShippingStatus } from '../model/interface';

@Component({
  selector: 'app-order-update-status',
  templateUrl: './order-update-status.component.html',
  styleUrls: ['./order-update-status.component.scss']
})
export class OrderUpdateStatusComponent implements OnInit {
  @Input() order: Order;
  @Output() updateEmitter: EventEmitter<string> = new EventEmitter();
  selectedShippingOption: any = 'Pending';

  shippingStatus : string[] = Object.keys(ShippingStatus);
  options: any;

  constructor() { }

  ngOnInit() {
    this.options = this.shippingStatus.slice(this.shippingStatus.length / 2);
    this.selectedShippingOption = ShippingStatus[this.order.status];
  }

  onSave() {
    this.updateEmitter.emit(ShippingStatus[this.selectedShippingOption]);
  }

  selectComparator(item: string, other: string) {
    return item == other;
  }

}
