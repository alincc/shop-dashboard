import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConfirmationService } from '../../../services';
import { Category, ResolveEmit } from '../../../model/interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @Input() categories: Category[];
  @Output() create: EventEmitter<Category> = new EventEmitter();
  @Output() remove: EventEmitter<Category> = new EventEmitter();
  @Output() removeSelected: EventEmitter<Category[]> = new EventEmitter();
  currentPage: number = 1;
  isFinished: boolean = false;
  creating: boolean = false;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  removeCategory(category: Category): void {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.remove.emit(category);
        }
      })
  }

  onCreate(category: Category) {
    this.create.emit(category);
    this.creating = false;
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

  onRemoveSelected(): void {
    this.removeSelected.emit(this.selected);
    this.selected = [];
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.onRemoveSelected();
        break;
    }
  }

}
