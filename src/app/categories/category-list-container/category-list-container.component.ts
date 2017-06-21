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
  creating: boolean = false;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

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

  onCreate(category: Category) {
    this.isFinished = false;

    this.categoryService.create(category)
      .subscribe(
        res => this.categories.push(res.data),
        err => console.log(err),
        () => {
          this.isFinished = true;
          this.creating = false;
          this.toastService.success('Success!', 'The category was created');
        },
      );
  }

  onSelect(category: Category): void {
    const exists = this.selected.find(id => id == category._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== category._id);
    }
    else {
      this.selected.push(category._id);
    }
  }

  removeSelected(): void {
    const list: Observable<string>[] = this.selected.map(id => this.categoryService.removeCategory(id));

    Observable.forkJoin(list)
      .subscribe(
        () => null,
        err => console.log(err),
        () => {
          this.categories = this.categories
            .filter(category => this.selected.indexOf(category._id) === -1)

          if (this.selected.length) {
            this.toastService.success('Removed!', 'The categories was removed from the catalog');
          }

          this.selected = [];
        }
      );
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.removeSelected();
        break;
    }
  }

}
