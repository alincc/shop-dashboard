import { Component, OnInit } from '@angular/core';

import { Product, Message, ErrorResponse } from '../model/interface';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {

  products: Product[];
  isFinished: boolean = false;
  errorMsg: Message;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .subscribe(
        products => this.products = products,
        err => this.handleError(err),
        () => this.isFinished = true,
      );
  }

  removeProduct(product: Product) {
    this.productService.removeProduct(product._id)
      .subscribe(
        res => this.products = this.products.filter(item => product._id !== item._id),
        err => console.log(err),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
