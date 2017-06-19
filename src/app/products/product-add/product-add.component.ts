import { Component, OnInit } from '@angular/core';

import { ProductService, ToastService } from '../../services';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  onSubmit(data) {
    this.productService.createProduct(data)
      .subscribe(
        res => this.toastService.success('Product created!', 'The product was created successfully'),
        err => console.log(err),
      );
  }
}
