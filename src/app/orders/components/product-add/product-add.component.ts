import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Order, OrderLine } from '../../models/order';
import { IOption } from '../../../model/interface';
import { Product, Variant } from '../../../products/models/product';
import { SearchService } from '../../../products/search.service';
import { ToastService } from '../../../services';
import { OrderService } from '../../order.service';
import { CustomerService } from '../../../customers/customer.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  @Output() addEmitter: EventEmitter<OrderLine> = new EventEmitter();
  show: boolean = false;
  isFinished: boolean = false;
  term = new FormControl();
  items: Product[] = [];
  selected: {
    item: Product;
    variant: Variant;
    quantity: number;
    price: number;
  };

  constructor(
    private searchService: SearchService,
    private orderService: OrderService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.resetSelected();

    this.handleTermChanges();
  }

  toggle(): void {
    this.show = !this.show;
  }

  handleTermChanges(): void {
    // TODO: should use search action in store
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        this.isFinished = false;
        return this.searchService.search(term).finally(() => {
          this.isFinished = true
        })
      })
      .subscribe(items => this.items = items);
  }

  isInStock(product: Product, quantity: number): boolean {
    return product.getQuantity() >= quantity;
  }

  onSubmit(): void {
    if (!this.selected.item) {
      return null;
    }

    // Make sure quantity is more than zero
    if (this.selected.quantity <= 0) {
      this.toastService.warn('Invalid quantity', 'You need to add to specify the quantity');
      return null;
    }

    if (!this.isInStock(this.selected.item, this.selected.quantity)) {
      this.toastService.warn('Insufficient quantity in stock', 'The provided quantity is higher than the quantity in stock');
      return null;
    }

    const line: OrderLine = new OrderLine({
      variant: this.selected.variant,
      quantity: this.selected.quantity,
      price: this.selected.price,
    });

    this.addEmitter.emit(line);

    this.resetSelected();
    this.show = false;
  }

  onSelectItem(item: Product): void {
    const product = new Product(item);
    this.selected.item = product;
    this.selected.price = product.getCurrentPrice();
  }

  onCancel(): void {
    this.resetSelected();
  }

  resetSelected(): void {
    this.selected = {
      item: null,
      variant: null,
      quantity: 0,
      price: 0,
    };
  }

}
