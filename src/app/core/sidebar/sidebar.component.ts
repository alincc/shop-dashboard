import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() activeMenu: string | boolean;
  @Output() selectMenu = new EventEmitter<string | null>();

  constructor() { }

  ngOnInit() {
  }

  setActive(tab: string): void {
    if (this.activeMenu == tab) {
      this.selectMenu.emit(null);
    }
    else {
      this.selectMenu.emit(tab);
    }
  }

}
