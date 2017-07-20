import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DropdownValue, User } from '../../model/interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.getUserInfo()
      .subscribe(
        user => {
          this.user = new User(user);
        },
        e => console.log(e),
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  profileDropdownValues(): DropdownValue[] {
    return [
      new DropdownValue("/logout", "Logout"),
    ];
  }

}
