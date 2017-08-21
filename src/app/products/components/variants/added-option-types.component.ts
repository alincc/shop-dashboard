import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OptionType } from '../../models/product';

@Component({
  selector: 'app-added-option-types',
  template: `
    <div>
      <h3>Added Product Options</h3>

      <div class="message info" *ngIf="!optionTypes.length">
        This product has no added options yet.
      </div>

      <ul *ngIf="optionTypes.length" class="option-list">
        <li *ngFor="let option of optionTypes; let i = index;">
          {{ option.label }} <span class="label bg-danger cursor pull-right" (click)="remove.emit(i)">Remove option</span>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .option-list {
      list-style: none;
      padding: 0;
    }
  `],
})
export class AddedOptionTypesComponent implements OnInit {
  @Input() optionTypes: OptionType[];
  @Output() remove = new EventEmitter<any>();

  constructor() {  }

  ngOnInit() {}
}
