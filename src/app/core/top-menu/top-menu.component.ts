import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { DropdownValue, User } from '../../model/interface';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  @Input() showSidenav: boolean;
  @Input() user: User;
  @Output() toggleSideNav: EventEmitter<any> = new EventEmitter();

  profileDropdownValues: DropdownValue[] = [];

  constructor() { }

  ngOnInit() {
    this.user = new User(this.user);

    this.profileDropdownValues = [
      new DropdownValue("/logout", "Logout"),
    ];
  }

  onToggleSideNav(): void {
    this.toggleSideNav.emit({ show: !this.showSidenav });
  }

}
