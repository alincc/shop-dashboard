import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../model/interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() data: Message;

  constructor() { }

  ngOnInit() {
  }

}
