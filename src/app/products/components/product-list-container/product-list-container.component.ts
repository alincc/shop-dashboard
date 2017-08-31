import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product, Message, ErrorResponse, ResolveEmit } from '../../../model/interface';
import { ProductService } from '../../product.service';
import { ToastService, ConfirmationService } from '../../../services';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent implements OnInit {
  @Input() products: Product[];
  @Input() displayRemoved: boolean = false;
  @Output() create: EventEmitter<Product> = new EventEmitter();
  @Output() remove: EventEmitter<Product> = new EventEmitter();
  @Output() restore: EventEmitter<Product> = new EventEmitter();
  @Output() toggleDisplayRemoved: EventEmitter<any> = new EventEmitter();
  @Output() removeSelected: EventEmitter<Product[]> = new EventEmitter();
  currentPage: number = 1;
  reverse: boolean = false;
  order: string = 'name';
  isFinished: boolean = false;
  errorMsg: Message;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ];
  filter: any = {};

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  removeProduct(product: Product) {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.remove.emit(product);
        }
      })
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

  onRemoveSelected(): void {
    this.removeSelected.emit(this.selected);
    this.selected = [];
  }

  onSelect(product: Product): void {
    const exists = this.selected.find(id => id == product._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== product._id);
    }
    else {
      this.selected.push(product._id);
    }
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.onRemoveSelected();
        break;
    }
  }

  setOrder(value: string): void {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  isActiveSorting(value: string, reverse: boolean): boolean {
    return this.order === value && this.reverse === reverse;
  }

  visibleProducts() {
    if (!this.displayRemoved) {
      return this.products.filter(product => product.deleted === false);
    }
    return this.products;
  }

  restoreProduct(product: Product) {
    this.confirmationService
      .create('Are you sure?', 'The product will be restored and visible to customers')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.restore.emit(product);
        }
      })
  }

}
