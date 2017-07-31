import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { Thread, Message, AddMessage } from './message';

@Injectable()
export class ThreadService {

  private url = 'thread';

  constructor(
    private http: HttpService,
  ) { }

  create(thread: Thread): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(thread), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(id: string, thread: Thread): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.url}/${id}`, JSON.stringify(thread), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(id: string): Observable<Thread> {
    return this.http.get(`${this.url}/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAll(): Observable<Thread[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  remove(id: string) {
    return this.http.delete(`${this.url}/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  removeMany(ids: string[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = {
      ids,
    };

    return this.http.post(`${this.url}/delete-many`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  addMessage(addMessage: AddMessage) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.url}/add-message`, JSON.stringify(addMessage), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }
}
