import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Order, OrderLine } from '../../models/order';
import { Product, Combination, IOption } from '../../../model/interface';
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
    item: Product,
    combination: Combination,
    quantity: number,
    price: number,
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

  isInStock(product: Product, quantity: number, combination: Combination = null): boolean {
    return product.getQuantity(combination) >= quantity;
  }

  onSubmit(): void {
    if (!this.selected.item) {
      return null;
    }

    // If the product has combination, a combination needs to be selected
    if (this.selected.item.hasCombinations() && !this.selected.combination) {
      this.toastService.warn('No combination selected', 'Please select a combination before adding the product');
      return null;
    }

    // Make sure quantity is more than zero
    if (this.selected.quantity <= 0) {
      this.toastService.warn('Invalid quantity', 'You need to add to specify the quantity');
      return null;
    }

    if (!this.isInStock(this.selected.item, this.selected.quantity, this.selected.combination)) {
      this.toastService.warn('Insufficient quantity in stock', 'The provided quantity is higher than the quantity in stock');
      return null;
    }

    const line: OrderLine = new OrderLine({
      product: this.selected.item,
      quantity: this.selected.quantity,
      price: this.selected.price,
      combination: this.selected.combination ? this.selected.combination.attributes : null,
      selectedCombination: this.selected.combination,
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
      combination: null,
      quantity: 0,
      price: 0,
    };
  }

  combinationOptions(): IOption[] {
    if (!this.selected.item || !this.selected.item.combinations.length) {
      return null;
    }

    return this.selected.item.combinations.map(combination => ({ label: combination.valuesToString(), value: combination }));
  }

}
