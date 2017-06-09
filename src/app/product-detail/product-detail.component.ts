import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Product, ErrorResponse, Message } from '../model/interface';
import { ProductService } from '../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  private errorMsg: Message;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.productService.getProduct(params['id']))
      .subscribe(
        product => this.product = product,
        err => this.handleError(err),
      );
  }

  onSubmit(data) {
    this.productService.updateProduct(this.product._id, data)
      .subscribe(
        res => console.log(res),
        err => console.log(err),
      )
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
