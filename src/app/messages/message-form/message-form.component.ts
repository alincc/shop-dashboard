import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Message } from '../message';
import * as fromAuth from '../../auth/reducers';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit, OnDestroy {
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  message: Message;
  subscription: Subscription;

  constructor(
    private store: Store<fromAuth.State>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select(fromAuth.getUser)
      .subscribe(
        user => {
          this.message = {
            body: '',
            user: user,
          }
        },
        err => console.log(err),
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmitMessage(): void {
    if (this.message.body.length > 0) {
      this.submitEmitter.emit(this.message);
    }
  }

}
