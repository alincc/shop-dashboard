import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import * as fromAuth from '../../reducers';
import * as authActions from '../../actions/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new authActions.Logout());
  }

}
