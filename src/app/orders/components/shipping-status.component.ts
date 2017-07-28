import { Component, OnInit, Input } from '@angular/core';

import { ShippingStatus } from '../../model/interface';

@Component({
  selector: 'app-shipping-status',
  template: `
    <span class="label" [ngClass]="this.getStyle()">{{ this.toString() }}</span>
  `,
  styles: [],
})
export class ShippingStatusComponent implements OnInit {
  @Input() status: ShippingStatus;

  constructor() {  }

  ngOnInit() {
  }

  getStyle() {
    // TODO: fix specific class colors
    return {
      'bg-primary': this.status === 0,
      'bg-info': this.status === 1,
      'bg-danger': this.status === 2,
      'bg-warning': this.status === 3,
      'bg-success': this.status === 4,
    }
  }

  toString(): string {
    return ShippingStatus[this.status];
  }
}
