import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CategoryService, ConfirmationService, ToastService } from '../../services';
import { Category, ResolveEmit } from '../../model/interface';

@Component({
  selector: 'app-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.scss']
})
export class CategoryListContainerComponent implements OnInit {
  currentPage: number = 1;
  categories: Category[];
  isFinished: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

  removeCategory(category: Category): void {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .switchMap((ans: ResolveEmit) => ans.resolved ? this.categoryService.removeCategory(category._id) : Observable.of(null))
      .subscribe(
        res => {
          if (res) {
            this.categories = this.categories.filter(c => c._id !== category._id);
            this.toastService.success('Removed!', 'The category was removed from the catalog');
          }
        },
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

}
