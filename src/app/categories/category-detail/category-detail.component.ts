import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Category, ErrorResponse, Message } from '../../model/interface';
import { CategoryService, ToastService } from '../../services';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  category: Category;
  errorMsg: Message;
  isFinished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.categoryService.getCategory(params['id']))
      .subscribe(
        category => this.category = new Category(category),
        err => this.handleError(err),
      );
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

  onSubmit(data) {
    this.isFinished = false;

    this.categoryService.update(this.category._id, data)
      .subscribe(
        res => this.category = new Category(res.data),
        err => console.log(err),
        () => {
          this.isFinished = true;
          this.toastService.success('Saved!', 'The category was updated');
        },
      );
  }

}
