import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ResolveEmit } from '../../../model/interface';
import { Carrier } from '../../models/carrier';
import { ConfirmationService } from '../../../services';

@Component({
  selector: 'app-carrier-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss']
})
export class CarrierListComponent implements OnInit {
  @Input() carriers: Carrier[];
  @Output() create: EventEmitter<Carrier> = new EventEmitter();
  @Output() remove: EventEmitter<Carrier> = new EventEmitter();
  @Output() removeSelected: EventEmitter<Carrier[]> = new EventEmitter();
  currentPage: number = 1;
  isFinished: boolean = false;
  selected: Carrier[] = [];
  creating: boolean = false;
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

  constructor(
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
  }

  onCreate(carrier: Carrier) {
    this.create.emit(carrier);
    this.creating = false;
  }

  removeCarrier(carrier: Carrier): void {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .subscribe((ans: ResolveEmit) => {
        if (ans.resolved) {
          this.remove.emit(carrier);
        }
      })
  }

  onSelect(carrier: Carrier): void {
    const exists = this.selected.find(item => item._id == carrier._id);

    if (exists) {
      this.selected = this.selected.filter(item => item._id !== carrier._id);
    }
    else {
      this.selected.push(carrier);
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
