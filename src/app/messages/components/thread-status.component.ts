import { Component, OnInit, Input } from '@angular/core';

import { ThreadStatus } from '../message';

@Component({
  selector: 'app-thread-status',
  template: `
    <span class="label" [ngClass]="this.getStyle()">{{ this.toString() }}</span>
  `,
  styles: [],
})
export class ThreadStatusComponent implements OnInit {
  @Input() status: ThreadStatus;

  constructor() {  }

  ngOnInit() {
  }

  getStyle() {
    return {
      'bg-success': this.status === 0,
      'bg-info': this.status === 1,
      'bg-danger': this.status === 2,
    }
  }

  toString(): string {
    return ThreadStatus[this.status];
  }
}
