import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { Carrier } from './models/carrier';

@Injectable()
export class CarrierService {
  private url = 'shipping';

  constructor(
    private http: HttpService,
  ) { }

  create(carrier: Carrier): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(carrier), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(id: string, carrier: Carrier): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(`${this.url}/${id}`, JSON.stringify(carrier), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  get(id: string): Observable<Carrier> {
    return this.http.get(`${this.url}/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getAll(): Observable<Carrier[]> {
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
