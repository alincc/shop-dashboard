import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Product, ErrorResponse, Message, ResolveEmit } from '../../../model/interface';
import { OptionType, ProductRemove } from '../../models/product';
import { ProductService } from '../../product.service';
import { ToastService, ConfirmationService } from '../../../services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Input() optionTypes: OptionType[];
  @Output() update: EventEmitter<Product> = new EventEmitter();
  @Output() remove: EventEmitter<ProductRemove> = new EventEmitter();
  @Output() restore: EventEmitter<Product> = new EventEmitter();
  private errorMsg: Message;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  onSubmit(data) {
    data._id = this.product._id;
    this.update.emit(data);
  }

  onRemove(soft: boolean = true) {
    if (!this.product._id) return false;

    this.confirmationService
      .create('Are you sure?', 'The product will be removed from the store')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.remove.emit({ product: this.product, soft });
        }
      });
  }

  onRestore() {
    if (!this.product._id) return false;

    this.confirmationService
      .create('Are you sure?', 'The product will be restored and visible to customers')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restore.emit(this.product);
        }
      });
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

}
