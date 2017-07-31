import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Thread, Message, AddMessage, ThreadStatus } from '../message';

@Component({
  selector: 'app-thread-detail',
  template: `
    <app-title-pane
      heading="Customer service"
      subtitle="Customer service">
    </app-title-pane>

    <div class="thread-detail main" *ngIf="thread">

      <div class="box">

        <div class="heading">
          View Thread
          <app-thread-status [status]="thread.status"></app-thread-status>
        </div>

        <div class="body">

          <div class="status-select m-b">
            <h4 class="mark-as m-sm">Mark as:</h4>

            <button class="btn btn-sm btn-danger" type="button" (click)="setStatus(threadStatus.OPEN)">Re-open</button>
            <button class="btn btn-sm btn-info" type="button" (click)="setStatus(threadStatus.PENDING)">Pending</button>
            <button class="btn btn-sm btn-success" type="button" (click)="setStatus(threadStatus.CLOSED)">Closed</button>
          </div>

          <div *ngIf="thread.messages.length" class="m-b b-l m-l-md pos-rlt">
            <app-message-item *ngFor="let message of thread.messages" [message]="message"></app-message-item>
          </div>

          <h3 class="text-subtitle">Respond to this thread</h3>

          <blockquote class="blockquote" *ngIf="thread.status == 2">
            This thread is closed, re-open it in order to make a response.
          </blockquote>

          <app-message-form (submitEmitter)="onSubmitMessage($event)" *ngIf="thread.status != 2"></app-message-form>

        </div>

      </div>

    </div>
  `,
  styles: [`
    .status-select {
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 15px;
    }
    .mark-as {
      display: inline-block;
    }
  `],
})
export class ThreadDetailComponent implements OnInit {
  @Input() thread: Thread;
  @Output() submitMessage: EventEmitter<AddMessage> = new EventEmitter();
  @Output() update: EventEmitter<Thread> = new EventEmitter();
  threadStatus = ThreadStatus;

  constructor() {  }

  ngOnInit() {}

  onSubmitMessage(message: Message): void {
    this.submitMessage.emit({ threadId: this.thread._id, message });
  }

  setStatus(status: ThreadStatus): void {
    this.thread.status = status;
    this.onUpdate();
  }

  onUpdate(): void {
    this.update.emit(this.thread);
  }

  getStatusClass(): any {
    return {
      'bg-danger': this.thread.status === 0,
      'bg-info': this.thread.status === 1,
      'bg-success': this.thread.status === 2,
    }
  }
}
