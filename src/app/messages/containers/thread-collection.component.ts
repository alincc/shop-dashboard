import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromThreads from '../reducers';
import * as collectionActions from '../actions/collection';
import { Thread } from '../message';

@Component({
  selector: 'app-thread-collection',
  template: `
    <app-thread-list
      [threads]="threads$ | async">
    </app-thread-list>
  `,
  styles: [],
})
export class ThreadCollectionComponent {
  threads$: Observable<Thread[]>;

  constructor(private store: Store<fromThreads.State>) {
    this.threads$ = this.store.select(fromThreads.getThreadCollection);
  }

}
