import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ConfirmationService } from '../../../services/confirmation.service';
import { OptionType, OptionValue } from '../../models/product';
import { ResolveEmit } from '../../../model/interface';

@Component({
  selector: 'app-option-type-list',
  template: `
    <app-title-pane heading="Option types" subtitle="Manage product attributes">
      <div options>
        <a class="btn btn-sm btn-info btn-addon" (click)="creating = !creating">
          <i class="fa fa-plus"></i>
          Create new
        </a>
      </div>
    </app-title-pane>

    <div class="option-type-list main">

      <app-option-type-form
        *ngIf="creating"
        [formOnly]="true"
        (cancelEmmiter)="creating = false"
        (submitEmitter)="onCreate($event)">
      </app-option-type-form>

      <div class="box">

        <div class="heading">Option types</div>

        <div class="body" *ngIf="!optionTypes.length">
          <div class="message info">There are no option types added to the store yet</div>
        </div>

        <div class="body" *ngIf="optionTypes.length">

          <app-multi-select
            [buttonDisable]="!selected.length"
            [options]="actionOptions"
            (submitEmitter)="doAction($event)">
          </app-multi-select>

          <table class="table table-responsive">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Label</th>
                <th>Values</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr *ngFor="let optionType of optionTypes | paginate: { itemsPerPage: 10, currentPage: currentPage }">
                <td class="text-center no-label" style="width: 10px">
                  <input type="checkbox" (change)="onSelect(optonType)" />
                </td>
                <td data-label="Name">{{ optionType.name }}</td>
                <td data-label="Label">{{ optionType.label }}</td>
                <td data-label="Values">
                  {{ optionValuesAsString(optionType.values) }}
                </td>
                <td class="no-label">
                  <a class="btn btn-sm btn-icon btn-info" [routerLink]="['/options', optionType._id]">
                    <i class="fa fa-edit"></i>
                  </a>

                  <a (click)="removeOptionType(optionType)" class="btn btn-sm btn-icon btn-danger">
                    <i class="fa fa-remove"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <pagination-controls (pageChange)="currentPage = $event" class="pagination"></pagination-controls>

        </div>

      </div>

    </div>
  `,
})
export class OptionTypeListComponent implements OnInit {
  @Input() optionTypes: OptionType[];
  @Output() create: EventEmitter<OptionType> = new EventEmitter();
  @Output() remove: EventEmitter<OptionType> = new EventEmitter();
  @Output() removeSelected: EventEmitter<OptionType[]> = new EventEmitter();

  creating: boolean = false;
  currentPage: number = 1;
  selected = [];
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ];

  constructor(private confirmationService: ConfirmationService) {  }

  ngOnInit() {}

  optionValuesAsString(optionValues: OptionValue[]): string {
    return optionValues.map(value => value.name).join(', ');
  }

  onSelect(optionType: OptionType): void {
    const exists = this.selected.find(id => id == optionType._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== optionType._id);
    }
    else {
      this.selected.push(optionType._id);
    }
  }

  removeOptionType(optionType: OptionType): void {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.remove.emit(optionType);
        }
      })
  }

  onRemoveSelected(): void {
    this.removeSelected.emit(this.selected);
    this.selected = [];
  }

  onCreate(optionType: OptionType) {
    this.create.emit(optionType);
    this.creating = false;
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.onRemoveSelected();
        break;
    }
  }
}
