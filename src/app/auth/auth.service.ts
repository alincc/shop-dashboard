import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import { HttpService } from '../core/http.service';
import { User } from '../model/interface';

@Injectable()
export class AuthService {

  private token: string;
  private url = 'auth';

  constructor(private http: HttpService) { }

  isAuthed(): boolean {
    return tokenNotExpired();
  }

  validate(email: String, password: String): Observable<boolean> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
      email,
      password,
    });

    return this.http.post(this.url, body, options)
      .map((res: Response) => {
        let token = res.json() && res.json().token;

        if (token) {
          this.token = token;

          this.authSuccess(token);
          return true;
        }

        return false;
      })
      .catch((err: any) => {
        return Observable.throw("Error");
      });
  }

  authSuccess(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserInfo(): Observable<User> {
    let headers = new Headers({ 'authorization': 'Bearer ' + localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + '/userinfo', options)
      .map((res: Response) => res.json())
      .catch((err: any) => Observable.throw(err.json().error));
  }

}
