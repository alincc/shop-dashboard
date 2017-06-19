import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../model/interface';

@Component({
  selector: 'app-customer-note-form',
  templateUrl: './customer-note-form.component.html',
  styleUrls: ['./customer-note-form.component.scss']
})
export class CustomerNoteFormComponent implements OnInit {
  @Input() customer: Customer;
  @Output() noteEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.noteEmitter.emit(this.customer.note);
  }

}
