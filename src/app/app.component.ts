import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './core/loader/loader.service';
import { LoaderState } from './core/loader/loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = false;

  private loaderSubscription: Subscription;

  public notificationOptions = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: true,
      maxStack: 3,
      preventDuplicates: true,
      animate: 'fromRight',
  }

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderSubscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
          this.isLoading = state.show;
      });
  }

  ngOnDestroy() {

  }
}
