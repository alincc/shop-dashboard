import { Component, OnInit } from '@angular/core';

import { LoaderService } from './core/loader/loader.service';
import { LoaderState } from './core/loader/loader';

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

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {}
}
