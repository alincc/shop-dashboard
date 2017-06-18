import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product, Message, ErrorResponse, ResolveEmit } from '../model/interface';
import { ProductService, ToastService, ConfirmationService } from '../services';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  currentPage: number = 1;
  products: Product[];
  isFinished: boolean = false;
  errorMsg: Message;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

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
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .switchMap((ans: ResolveEmit) => ans.resolved ? this.productService.removeProduct(product._id) : Observable.of(null))
      .subscribe(
        res => {
          if (res) {
            this.products = this.products.filter(item => product._id !== item._id);
            this.toastService.success('Removed!', 'The product was removed from the catalog');
          }
        },
        err => console.log(err),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
