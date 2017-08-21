import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OptionType } from '../../models/product';

@Component({
  selector: 'app-attach-option-type',
  template: `
    <div>
      <h3>Add option type for this product</h3>

      <div *ngIf="!optionTypes.length" class="message info">
        There are no more available options
      </div>

      <span
        class="label bg-primary cursor"
        *ngFor="let option of optionTypes"
        (click)="attach.emit(option)">
        {{ option.label }}
      </span>
    </div>
  `,
  styles: [],
})
export class AttachOptionTypeComponent implements OnInit {
  @Input() optionTypes: OptionType[];
  @Output() attach = new EventEmitter<OptionType>();

  constructor() {  }

  ngOnInit() {}
}
