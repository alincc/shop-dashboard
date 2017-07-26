import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Authenticate } from '../models/user';
import * as fromAuth from '../reducers';
import * as Auth from '../actions/auth';
import { ToastService } from '../../services';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </app-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.select(fromAuth.getLoginPagePending);
  error$ = this.store.select(fromAuth.getLoginPageError);

  constructor(
    private store: Store<fromAuth.State>,
    private toastService: ToastService,
  ) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Auth.Login($event));
    // TODO: should only display on login success
    this.toastService.success('Signed in', 'You have been succesfully signed in');
  }
}
