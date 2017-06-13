import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-pane',
  templateUrl: './title-pane.component.html',
  styleUrls: ['./title-pane.component.scss']
})
export class TitlePaneComponent implements OnInit {
  @Input() heading: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}
