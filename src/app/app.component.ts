import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoaderService } from './core/loader/loader.service';
import { LoaderState } from './core/loader/loader';
import * as authActions from './auth/actions/auth';
import * as fromAuth from './auth/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;

  public notificationOptions = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: true,
      maxStack: 3,
      preventDuplicates: true,
      animate: 'fromRight',
  }

  constructor(
    private loaderService: LoaderService,
    private store: Store<fromAuth.State>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new authActions.CheckAuthAction());
  }
}
