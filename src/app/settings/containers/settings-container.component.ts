import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ISettings } from '../models/settings';
import * as fromSettings from '../reducers';
import * as actions from '../actions/settings';

@Component({
  selector: 'app-settings-container',
  template: `
    <app-title-pane
      heading="Settings"
      subtitle="Manage settings">
    </app-title-pane>

    <div class="settings main">

      <app-settings-wrapper [settings]="settings$ | async" (submitEmit)="onSubmit($event)"></app-settings-wrapper>

      <!--
      <div class="box">
        <div class="heading">Pagination</div>
        <div class="body">
          <form class="form">

            <div class="field">
              <label for="products-per-page">Products per page</label>
              <input type="number" name="itemsPerPage" id="products-per-page" placeholder="Products per page" value="12" />
            </div>

            <div class="field">
              <label for="order-by">Order by</label>
              <select name="orderBy" id="order-by">
                <option value="name">Product name</option>
                <option value="price">Product price</option>
                <option value="createdAt">Product add date</option>
              </select>
            </div>

          </form>
        </div>
      </div> -->

    </div>
  `,
})
export class SettingsContainerComponent implements OnInit, OnDestroy {
  settings$: Observable<any>;
  actionsSubscription: Subscription;

  constructor(
    private store: Store<fromSettings.State>,
    route: ActivatedRoute,
  ) {
    this.actionsSubscription = route.params
      .map(params => new actions.SelectPageAction(params.page))
      .subscribe(store);

    this.settings$ = this.store.select(fromSettings.getSettings);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

  onSubmit(data: any) {
    this.store.dispatch(new actions.UpdateSettingsAction(data));
  }
}
