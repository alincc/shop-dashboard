import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order, ShippingStatus } from '../model/interface';

@Component({
  selector: 'app-order-update-status',
  templateUrl: './order-update-status.component.html',
  styleUrls: ['./order-update-status.component.scss']
})
export class OrderUpdateStatusComponent implements OnInit {
  @Input() order: Order;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();
  selectedShippingOption: any = '0';

  shippingStatus : string[] = Object.keys(ShippingStatus);
  options: any;

  constructor() { }

  ngOnInit() {
    this.options = this.shippingStatus.slice(this.shippingStatus.length / 2);
    this.selectedShippingOption = this.order.status.toString();
  }

  onSave() {
    this.updateEmitter.emit({ status: this.selectedShippingOption });
  }

  getOptions() {
    return this.options.map(item => ({ value: ShippingStatus[item].toString(), label: item }));
  }

}
