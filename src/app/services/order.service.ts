import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../core/http.service';
import { Order } from '../model/interface';

@Injectable()
export class OrderService {

  private url = 'order';

  constructor(private http: HttpService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.url)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  get(id: string): Observable<Order> {
    return this.http.get(`${this.url}/${id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  update(id: string, order: Order): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/' + id, JSON.stringify(order), options)
      .map((res: Response) => res.json())
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
