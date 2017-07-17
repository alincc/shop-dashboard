import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpService } from '../core/http.service';
import { Product } from '../model/interface';

@Injectable()
export class ProductService {
  private url = 'product';

  constructor(private http: HttpService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.url)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getProduct(id: String): Observable<Product> {
    return this.http.get(this.url + '/' + id)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  createProduct(product: Product) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(product);

    return this.http.post(this.url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateProduct(id: string, product: Product) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(product);

    return this.http.put(`${this.url}/${id}`, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  removeProduct(id: string, soft: boolean = true) {
    return this.http.delete(`${this.url}/${id}?soft=${soft}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  restoreProduct(id: string) {
    return this.http.get(`${this.url}/${id}/restore`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }
}
