import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ShippingLine } from '../../model/interface';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.scss']
})
export class ShippingInfoComponent implements OnInit {
  @Input() shipping: ShippingLine;
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  editing: boolean = false;
  previousTracking: string;

  constructor() { }

  ngOnInit() {
    this.previousTracking = this.shipping.trackingNumber;
  }

  onSave(): void {
    this.updateEmitter.emit({ shipping: this.shipping });
    this.editing = false;
  }

  onCancelEdit(): void {
    this.shipping.trackingNumber = this.previousTracking;
    this.editing = false;
  }

}
