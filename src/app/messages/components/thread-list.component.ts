import { Component, OnInit, Input } from '@angular/core';

import { Thread } from '../message';

@Component({
  selector: 'app-thread-list',
  template: `
    <app-title-pane
      heading="Customer service"
      subtitle="Customer service">
    </app-title-pane>

    <div class="thread-list main">

      <div class="box">

        <div class="heading">Customer service</div>

        <div class="body">

          <table class="table table-responsive" *ngIf="threads">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Messages</th>
                <th>Last message</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr *ngFor="let thread of threads | paginate: { itemsPerPage: 10, currentPage: currentPage }">
                <td>[customer]</td>
                <td>
                  <app-thread-status [status]="thread.status"></app-thread-status>
                </td>
                <td>
                  <span *ngIf="thread.messages.length">
                    {{ thread.lastMessage.body | slice:0:50 }}...
                  </span>
                </td>
                <td>
                  <span *ngIf="thread.messages.length">{{ thread.lastMessage.createdAt | date:'short' }}</span>
                </td>
                <td>
                  <a [routerLink]="['/thread', thread._id]" class="btn btn-xs btn-info">View</a>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>
  `,
  styles: [],
})
export class ThreadListComponent implements OnInit {
  @Input() threads: Thread[];
  currentPage: number = 1;

  constructor() {  }

  ngOnInit() {}
}
