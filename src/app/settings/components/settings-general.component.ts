import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-general',
  template: `
    <app-settings-box [title]="'general'" [formGroup]="group">

      <div class="field">
        <label for="number-decimals">Number of decimals</label>
        <input type="number" formControlName="nrOfDecimals" id="number-decimals" placeholder="Number of decimals to display" />
      </div>

      <div class="field">
        <label for="maintenance-mode">Enable maintenance mode</label>
        <input type="checkbox" formControlName="maintenanceMode" />
      </div>

      <div class="field">
        <label for="maintenance-text">Maintenance text</label>
        <input type="text" formControlName="maintenanceText" id="maintenance-text" placeholder="Text do display on maintenance mode" />
      </div>

      <button type="submit" class="btn btn-info">Save</button>
      <button type="button" class="btn btn-danger" (click)="reset.emit()">Revert changes</button>

    </app-settings-box>
  `,
})
export class SettingsGeneralComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() reset = new EventEmitter<any>();

  constructor() {  }

  ngOnInit() {}
}
