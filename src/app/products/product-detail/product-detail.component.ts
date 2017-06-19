import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Product, ErrorResponse, Message, ResolveEmit } from '../../model/interface';
import { ProductService, ToastService, ConfirmationService } from '../../services';

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
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private location: Location,
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
        res => this.toastService.success('Product saved!', 'The product was updated successfully'),
        err => console.log(err),
        () => this.location.back()
      );
  }

  onRemove() {
    if (!this.product._id) return false;

    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .switchMap((ans: ResolveEmit) => ans.resolved ? this.productService.removeProduct(this.product._id) : Observable.of(null))
      .subscribe(
        res => {
          if (res) {
            this.toastService.success('Product removed!', 'The product was removed from the catalog');
            this.location.back();
          }
        },
        err => console.log(err),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
