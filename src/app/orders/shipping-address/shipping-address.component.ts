import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ShippingAddress } from '../../model/interface';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  @Input() shippingAddress: ShippingAddress;
  @Input() editable: boolean = false;
  @Output() updateEmitter: EventEmitter<ShippingAddress> = new EventEmitter();

  editing: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onSave(): void {
    this.updateEmitter.emit(this.shippingAddress);
    this.editing = false;
  }

}
