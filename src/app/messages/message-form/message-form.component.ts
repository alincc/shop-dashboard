import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Message } from '../message';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit, OnDestroy {
  @Output() submitEmitter: EventEmitter<any> = new EventEmitter();
  message: Message;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getUserInfo()
      .subscribe(
        user => {
          this.message = {
            body: '',
            user: user,
          }
        },
        e => console.log(e),
      )
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
