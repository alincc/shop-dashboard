import { Component, Output, EventEmitter, Input } from '@angular/core';

import { ErrorResponse, Message } from '../../../model/interface';
import { Carrier } from '../../models/carrier';

@Component({
  selector: 'app-carrier-detail',
  templateUrl: './carrier-detail.component.html',
  styleUrls: ['./carrier-detail.component.scss']
})
export class CarrierDetailComponent {
  @Input() carrier: Carrier;
  @Output() update: EventEmitter<Carrier> = new EventEmitter();
  errorMsg: Message;
  isFinished: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  handleError(error: ErrorResponse) {
    this.errorMsg = new Message('negative', error.message, 'Ooops..');
  }

  onSubmit(data) {
    data._id = this.carrier._id; // TODO: fix cleaner
    this.update.emit(data);
  }

}
