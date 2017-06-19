import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Shipping, ErrorResponse, Message } from '../../model/interface';
import { CarrierService } from '../carrier.service';
import { ToastService } from '../../services';

@Component({
  selector: 'app-carrier-detail',
  templateUrl: './carrier-detail.component.html',
  styleUrls: ['./carrier-detail.component.scss']
})
export class CarrierDetailComponent implements OnInit {

    carrier: Shipping;
    errorMsg: Message;
    isFinished: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private carrierService: CarrierService,
      private toastService: ToastService,
    ) { }

    ngOnInit() {
      this.route.params
        .switchMap((params: Params) => this.carrierService.get(params['id']))
        .subscribe(
          carrier => this.carrier = carrier,
          err => this.handleError(err),
        );
    }

    handleError(error: ErrorResponse) {
      this.errorMsg = new Message('negative', error.message, 'Ooops..');
    }

    onSubmit(data) {
      this.isFinished = false;

      this.carrierService.update(this.carrier._id, data)
        .subscribe(
          res => this.carrier = res.data,
          err => console.log(err),
          () => {
            this.isFinished = true;
            this.toastService.success('Saved!', 'The carrier was updated');
          },
        );
    }

}
