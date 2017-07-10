import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DropdownValue } from '../../model/interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class DropdownComponent implements OnInit {

  @Input() label: String;
  @Input() icon: String;
  @Input() items: DropdownValue[];
  @Input() openRight: boolean = false;

  visible: boolean = false;

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
  }

  toggle() {
    this.visible = !this.visible;
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.visible = false;
    }
  }

}
