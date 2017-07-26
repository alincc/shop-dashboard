import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Category, ErrorResponse, Message } from '../../../model/interface';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category: Category;
  @Output() update: EventEmitter<Category> = new EventEmitter();
  errorMsg: Message;
  isFinished: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

  onSubmit(data) {
    data._id = this.category._id; // TODO: fix cleaner
    this.update.emit(data);
  }

}
