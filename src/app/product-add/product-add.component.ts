import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    this.productService.createProduct(data)
      .subscribe(
        res => console.log(res),
        err => console.log(err),
      );
  }
}
