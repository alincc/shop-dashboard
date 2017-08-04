import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Settings } from '../models/settings';
import * as fromSettings from '../reducers';

@Component({
  selector: 'app-settings-wrapper',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="settings.loaded" [ngSwitch]="settings.selectedPage">

      <app-settings-products [group]="form" (reset)="onReset()" *ngSwitchCase="'products'"></app-settings-products>

      <app-settings-general [group]="form" (reset)="onReset()" *ngSwitchDefault></app-settings-general>

    </form>
  `,
})
export class SettingsWrapperComponent implements OnInit, OnDestroy, OnChanges {
  @Input() settings: any;
  @Output() submitEmit = new EventEmitter<any>();
  form: FormGroup;
  settingsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromSettings.State>,
  ) { }

  ngOnInit() {
    this.store.select(fromSettings.getSelectedPage)
      .subscribe(
        page => console.log(page)
      )

    if (this.settings) {
      this.buildForm(this.settings.properties);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.settings.previousValue &&
      changes.settings.previousValue.loaded === false
    ) {
      this.buildForm(this.settings.properties);
    }
  }

  ngOnDestroy() {
  }

  buildForm(settings: Settings): void {
    this.form = this.fb.group(this.initialize(settings));
  }

  initialize(settings: Settings): any {
    return {
      nrOfDecimals: settings.nrOfDecimals,
      maintenanceMode: settings.maintenanceMode,
      maintenanceText: settings.maintenanceText,
      displayProductQty: settings.displayProductQty,
    }
  }

  onReset(): void {
    this.form.patchValue(this.settings.properties);
  }

  onSubmit(): void {
    this.submitEmit.emit(this.form.value);
  }
}
