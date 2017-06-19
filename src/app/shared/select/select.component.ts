import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ExistingProvider } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import { IOption } from '../../model/interface';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() options: any;
  @Input() inline: boolean = false;
  @Input() width: string = '100%';

  isOpen: boolean = false;
  selected: IOption;
  selectContainerClicked: boolean = false;

  private data: any;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor() { }

  ngOnInit() {
  }

  get value(): any {
    return this.data;
  };

  set value(v: any) {
    this.data = v;
    this.onChange(v);
  }

  public writeValue(obj: any) {
    if (obj) {
      this.selected = this.options.find(item => this.isEqual(item.value, obj));
      this.data = obj;
    }
  }

  isEqual(item: any, other: any) {
    return JSON.stringify(item) == JSON.stringify(other);
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onSelect(item: IOption) {
    this.selected = item;
    this.data = item;
    this.isOpen = false;
    this.onChange(this.selected.value);
  }

  onSelectContainerClick(event: any): void {
    this.selectContainerClicked = true;
  }

  onWindowClick(): void {
    if (!this.selectContainerClicked) {
      this.isOpen = false;
    }
    this.selectContainerClicked = false;
  }

}
