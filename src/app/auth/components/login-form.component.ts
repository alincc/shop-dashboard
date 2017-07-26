import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../models/user';

@Component({
  selector: 'app-login-form',
  template: `
    <div class="login-container main">

      <h1>Login</h1>

      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <div class="field">
          <input type="text" mdInput placeholder="Username" formControlName="username">
        </div>

        <div class="field">
          <input type="password" mdInput placeholder="Password" formControlName="password">
        </div>

        <p *ngIf="errorMessage" class="loginError">
          {{ errorMessage }}
        </p>

        <button class="btn btn-primary" type="submit">Login</button>

      </form>

      <div class="text-center text-muted text-xs m">
        <a routerLink="/forgot">Forgot password?</a>
      </div>

      <div class="text-center text-muted text-xs m">
        <span>Copyright &copy; 2017 Markus Hederström All Rights Reserved.</span>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      width: 360px;
      margin: 0 auto;
    }
    button {
      width: 100%;
    }
  `],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    }

    this.form.enable();
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Authenticate>();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
