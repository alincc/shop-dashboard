import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { OrderService, CustomerService, ToastService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.validate(this.form.username, this.form.password)
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['/']);
          }
          else {
            this.toastService.error('Invalid credentials', 'The credentials you provided did not match an existing user');
          }
        },
        err => {
          this.toastService.error('Ooops..', 'Something went wrong');
        },
        () => {
          this.toastService.success('Signed in', 'You have been succesfully signed in');
        },
      );
  }

}
