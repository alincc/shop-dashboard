import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  @Input() options;
  @Input() buttonDisable: boolean = false;
  @Output() submitEmitter: EventEmitter<string> = new EventEmitter();
  selectedActionOption: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitEmitter.emit(this.selectedActionOption);
  }

}
