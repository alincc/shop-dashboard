import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-settings-box',
  template: `
    <div class="box">

      <div class="heading">{{ title | capitalize }}</div>

      <div class="body">

        <ng-content></ng-content>

      </div>

    </div>
  `,
})
export class SettingsBoxComponent implements OnInit {
  @Input() title: string;

  constructor() {  }

  ngOnInit() {}
}
