import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-products',
  template: `
    <app-settings-box [title]="'products'" [formGroup]="group">

      <div class="field">
        <label for="display-available-quantity">Display available quantity</label>
        <input type="checkbox" formControlName="displayProductQty" id="display-available-quantity" />
      </div>

      <button type="submit" class="btn btn-info">Save</button>
      <button type="button" class="btn btn-danger" (click)="onReset()">Revert changes</button>

    </app-settings-box>
  `,
})
export class SettingsProductsComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() reset = new EventEmitter<any>();

  constructor() {  }

  ngOnInit() {}
}
