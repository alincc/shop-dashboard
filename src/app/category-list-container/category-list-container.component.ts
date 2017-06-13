import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services';
import { Category } from '../model/interface';

@Component({
  selector: 'app-category-list-container',
  templateUrl: './category-list-container.component.html',
  styleUrls: ['./category-list-container.component.scss']
})
export class CategoryListContainerComponent implements OnInit {

  categories: Category[];
  isFinished: boolean = false;

  constructor(private categoryService: CategoryService) { }

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
    this.categoryService.removeCategory(category._id)
      .subscribe(
        res => this.categories = this.categories.filter(c => c._id !== category._id),
        err => console.log(err),
        () => this.isFinished = true,
      )
  }

}
