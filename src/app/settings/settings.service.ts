import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { Settings, SettingsProperty } from './models/settings';

@Injectable()
export class SettingsService {

  private url = 'settings';

  constructor(private http: HttpService) { }

  create(): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, {}, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(data: any): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const settings = new Settings(data);

    return this.http.put(this.url, JSON.stringify(settings), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(): Observable<any> {
    return this.http.get(this.url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }

}
