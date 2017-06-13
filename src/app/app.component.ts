import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  public notificationOptions = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: true,
      maxStack: 3,
      preventDuplicates: true,
      animate: 'fromRight',
  }
}
