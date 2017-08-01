import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../orders/models/order';
import { Thread } from '../message';

@Component({
  selector: 'app-customer-portrait',
  template: `
    <div class="panel panel-default no-padding">
      <div class="panel-body no-padding">

        <div class="text-center">

          <div class="thumb-xl avatar m-b">
            <img src="/assets/img/no-avatar.png" class="img-circle" alt="Customer Image" />
          </div>

          <div>
            <h4 class="m-t m-b-xs" *ngIf="thread.customer.name">{{ thread.customer.name }}</h4>
            <small class="text-muted m-b" *ngIf="thread.customer.email">{{ thread.customer.email }}</small>
          </div>

        </div>

      </div>

      <div class="panel-footer text-center bg-info">
        <div class="row">
          <div class="col-xs-4 col-md-4">

            <a [routerLink]="['/order', order._id]" class="text-block padded" *ngIf="order">
              <h3 class="m-b-xs text-white">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </h3>

              <small class="text-muted">Order</small>
            </a>

            <div class="padded" *ngIf="!order">
              <h3 class="m-b-xs text-white">
                <i class="fa fa-times" aria-hidden="true"></i>
              </h3>

              <small class="text-muted">No order</small>
            </div>

          </div>
          <div class="col-xs-8 col-md-8">
            <div class="padded darker">
              <h3 class="m-b-xs text-white">{{ thread.createdAt | timeAgo }}</h3>
              <small class="text-muted">Created</small>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class CustomerPortraitComponent implements OnInit {
  @Input() order: Order;
  @Input() thread: Thread;

  constructor() {  }

  ngOnInit() {}
}
