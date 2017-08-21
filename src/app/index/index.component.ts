import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../reducers';
import * as fromAuth from '../auth/reducers';
import { User } from '../model/interface';
import * as layout from '../core/actions/layout';
import * as authActions from '../auth/actions/auth';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  activeMenu$: Observable<string | boolean>;
  loggedIn$: Observable<boolean>;
  authChecked$: Observable<boolean>;
  user$: Observable<User>;
  userSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.activeMenu$ = this.store.select(fromRoot.getActiveMenu);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.authChecked$ = this.store.select(fromAuth.getChecked);
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit() {
  }

  onToggleSideNav(event: any): void {
    if (event.show === true) {
      this.store.dispatch(new layout.OpenSidenavAction());
    }
    else {
      this.store.dispatch(new layout.CloseSidenavAction());
    }
  }

  onSelectMenu(menu: string): void {
    this.store.dispatch(new layout.SelectActiveMenuAction(menu));
  }

  logout(): void {
    this.store.dispatch(new authActions.Logout());
  }

}
