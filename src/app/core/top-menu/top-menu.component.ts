import { Component, OnInit } from '@angular/core';

import { DropdownValue } from '../../model/interface';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  profileDropdownValues(): DropdownValue[] {
    return [
      new DropdownValue("/logout", "Logout"),
    ];
  }

}
