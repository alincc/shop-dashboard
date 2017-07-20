import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { Message } from './message';

@Injectable()
export class MessageService {

  private url = 'message';

  constructor(
    private http: HttpService,
  ) { }

  create(message: Message): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(message), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(id: string, message: Message): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.url}/${id}`, JSON.stringify(message), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(id: string): Observable<Message> {
    return this.http.get(`${this.url}/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAll(): Observable<Message[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id: string) {
    return this.http.delete(`${this.url}/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }
}
