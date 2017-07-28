import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-combination-control',
  template: `
    <div [formGroup]="group" class="row">
      <div class="col-md-6 col-xs-6">
        <span *ngIf="!group.value.attributes.length" class="text-italic">No Combination</span>
        <span *ngFor="let item of group.controls.attributes.controls; last as isLast">
          {{ item.controls.attribute.value.name }} - {{ item.controls.value.value.label + (!isLast ? ', ' : '' ) }}
        </span>
      </div>

      <div class="col-md-3 col-xs-3">
        <input type="text" placeholder="Quantity" formControlName="quantity">
      </div>

      <div class="col-md-3 col-xs-3">
        <button type="button" class="btn btn-sm btn-danger" (click)="removeControl()">Remove</button>
      </div>
    </div>
  `
})
export class CombinationControlComponent implements OnInit {
  @Input() group: FormGroup;
  @Output() removeEmitter: EventEmitter<FormGroup> = new EventEmitter();

  constructor() {  }

  ngOnInit() {
  }

  removeControl(): void {
    this.removeEmitter.emit(this.group);
  }
}
