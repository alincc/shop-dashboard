import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Shipping, ResolveEmit } from '../../model/interface';
import { ConfirmationService, ToastService } from '../../services';
import { CarrierService } from '../carrier.service';

@Component({
  selector: 'app-carrier-list',
  templateUrl: './carrier-list.component.html',
  styleUrls: ['./carrier-list.component.scss']
})
export class CarrierListComponent implements OnInit {
  carriers: Shipping[];
  currentPage: number = 1;
  isFinished: boolean = false;
  selected = [];
  creating: boolean = false;
  actionOptions = [
    { value: 'delete', label: 'Delete' },
  ]

  constructor(
    private carrierService: CarrierService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.loadCarriers();
  }

  loadCarriers(): void {
    this.carrierService.getAll()
      .subscribe(
        carriers => this.carriers = carriers,
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

  onCreate(carrier: Shipping) {
    this.isFinished = false;

    this.carrierService.create(carrier)
      .subscribe(
        res => this.carriers.push(res.data),
        err => console.log(err),
        () => {
          this.isFinished = true;
          this.creating = false;
          this.toastService.success('Success!', 'The carrier was created');
        },
      );
  }

  removeCarrier(carrier: Shipping): void {
    this.confirmationService
      .create('Are you sure?', 'Do you really want to delete this item?')
      .switchMap((ans: ResolveEmit) => ans.resolved ? this.carrierService.remove(carrier._id) : Observable.of(null))
      .subscribe(
        res => {
          if (res) {
            this.carriers = this.carriers.filter(c => c._id !== carrier._id);
            this.toastService.success('Removed!', 'The carrier was removed from the catalog');
          }
        },
        err => console.log(err),
        () => this.isFinished = true,
      );
  }

  onSelect(carrier: Shipping): void {
    const exists = this.selected.find(id => id == carrier._id);

    if (exists) {
      this.selected = this.selected.filter(id => id !== carrier._id);
    }
    else {
      this.selected.push(carrier._id);
    }
  }

  removeSelected(): void {
    const list: Observable<string>[] = this.selected.map(id => this.carrierService.remove(id));

    Observable.forkJoin(list)
      .subscribe(
        () => null,
        err => console.log(err),
        () => {
          this.carriers = this.carriers
            .filter(carrier => this.selected.indexOf(carrier._id) === -1)

          if (this.selected.length) {
            this.toastService.success('Removed!', 'The carriers was removed from the catalog');
          }

          this.selected = [];
        }
      );
  }

  doAction(action) {
    switch (action) {
      case 'delete':
        this.removeSelected();
        break;
    }
  }
}
