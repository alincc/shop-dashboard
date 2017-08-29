import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ErrorResponse, Message } from '../../../model/interface';
import { OptionType } from '../../models/product';

@Component({
  selector: 'app-option-type-detail',
  template: `
    <app-title-pane heading="View Option Type" subtitle="Manage product attributes"></app-title-pane>

    <div class="option-type-detail main">

      <app-message [data]="errorMsg"></app-message>

      <app-option-type-form *ngIf="optionType" [optionType]="optionType" (submitEmitter)="onSubmit($event)"></app-option-type-form>

    </div>
  `,
})
export class OptionTypeDetailComponent implements OnInit {
  @Input() optionType: OptionType;
  @Output() update: EventEmitter<OptionType> = new EventEmitter();
  errorMsg: Message;
  isFinished: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

  onSubmit(data) {
    data._id = this.optionType._id; // TODO: fix cleaner
    this.update.emit(data);
  }

}
