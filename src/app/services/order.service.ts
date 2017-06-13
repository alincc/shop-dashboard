import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Order } from '../model/interface';

@Injectable()
export class OrderService {

  private url = 'http://localhost:9000/api/order';

  constructor(private http: Http) { }

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

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }

}
