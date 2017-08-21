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
      return true;
      // const checked$ = this.store.select(fromAuth.getChecked);
      // const loggedIn$ = this.store.select(fromAuth.getLoggedIn);
      // return Observable.combineLatest(checked$, loggedIn$, (checked, loggedIn) => {
      //   if (!checked) return false;
      //
      //   if (!loggedIn) {
      //     return false;
      //   }
      //   return true;
      //
      // })
      // return true;
      // return this.store.select(fromAuth.selectAuthStatusState).take(1).map(authed => {
      //   console.log('atu', authed)
      //   // if (!authed.status.loggedIn && authed.status.checked) {
      //   //   this.store.dispatch(new authActions.LoginRedirect());
      //   //   return false;
      //   // }
      //
      //   return true;
      // });
  }
}
