import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import * as authActions from './actions/auth';
import * as fromAuth from './reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private store: Store<fromAuth.State>,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.store.select(fromAuth.getLoggedIn).take(1).map(authed => {
        if (!authed) {
          if (localStorage.getItem('token')) {
            this.store.dispatch(new authActions.GetUser({ user: true, redirect: false }));
            return true;
          }

          this.store.dispatch(new authActions.LoginRedirect());
          return false;
        }

        return true;
      });
  }
}
