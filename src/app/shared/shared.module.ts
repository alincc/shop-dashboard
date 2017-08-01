import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JasperoConfirmationsModule } from '@jaspero/ng2-confirmations';

import { NgxPaginationModule } from 'ngx-pagination';
import { TitlePaneComponent } from './title-pane/title-pane.component';
import { CustomerNoteFormComponent } from './customer-note-form/customer-note-form.component';
import { MessageComponent } from './message/message.component';
import { SelectComponent } from './select/select.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule, ReactiveFormsModule, JasperoConfirmationsModule],
  exports: [
    OrderByPipe,
    FilterPipe,
    TimeAgoPipe,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TitlePaneComponent,
    NgxPaginationModule,
    CustomerNoteFormComponent,
    MessageComponent,
    SelectComponent,
    DropdownComponent,
    MultiSelectComponent,
    JasperoConfirmationsModule,
    RouterModule,
  ],
  declarations: [
    OrderByPipe,
    FilterPipe,
    TimeAgoPipe,
    TitlePaneComponent,
    CustomerNoteFormComponent,
    MessageComponent,
    SelectComponent,
    MultiSelectComponent,
    DropdownComponent,
  ]
})
export class SharedModule { }
