import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../auth.service';
import * as Auth from '../actions/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .validate(auth.username, auth.password)
        .map(valid => {
          if (valid === true) {
            return new Auth.GetUser({ user: valid, redirect: true });
          }
          return new Auth.LoginFailure('Invalid credentials');
        })
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .do(() => {
      this.authService.logout();
    });

  @Effect()
  getUser$ = this.actions$
    .ofType(Auth.LOGIN_GET_USER)
    .map((action: Auth.GetUser) => action.payload)
    .exhaustMap(auth =>
      this.authService
        .getUserInfo()
        .map(user => {
          return new Auth.LoginSuccess({ user, redirect: auth.redirect });
        })
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do((action: Auth.LoginSuccess) => {
      if (action.payload.redirect === true) {
        this.router.navigate(['/'])
      }
    });

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

  @Effect()
  check$ = this.actions$
    .ofType(Auth.CHECK)
    .map(() => {
      if (localStorage.getItem('token')) {
        return new Auth.GetUser({ user: true, redirect: false });
      }
      return new Auth.GuestLoginAction();
    });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
