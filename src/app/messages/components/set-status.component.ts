import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ThreadStatus } from '../message';

@Component({
  selector: 'app-set-status',
  template: `
    <div class="panel panel-default">
      <div class="panel-body text-center">

        <div class="row">
          <div class="col-xs-4">
            <button class="btn btn-sm btn-danger" type="button" (click)="status.emit(threadStatus.OPEN)">Re-open</button>
          </div>
          <div class="col-xs-4">
            <button class="btn btn-sm btn-info" type="button" (click)="status.emit(threadStatus.PENDING)">Pending</button>
          </div>
          <div class="col-xs-4">
            <button class="btn btn-sm btn-success" type="button" (click)="status.emit(threadStatus.CLOSED)">Closed</button>
          </div>
        </div>

      </div>
    </div>
  `,
})
export class SetStatusComponent {
  @Output() status = new EventEmitter<ThreadStatus>();
  threadStatus = ThreadStatus;

  constructor() {  }
}
