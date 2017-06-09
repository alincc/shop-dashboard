import { Component, OnInit } from '@angular/core';
import { Product } from '../model/interface';
import { Observable } from 'rxjs/Observable';

import { FAKE_PRODUCT1 } from '../../testing/mocks';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor() { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    this.product = FAKE_PRODUCT1;
  }

}
