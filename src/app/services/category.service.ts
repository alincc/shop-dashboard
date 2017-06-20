import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from '../model/interface';

@Injectable()
export class CategoryService {
  private url = 'http://localhost:9000/api/category';

  constructor(private http: Http) { }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.url)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  getCategory(id: String): Observable<Category> {
    return this.http.get(this.url + '/' + id)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  create(category: Category): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, JSON.stringify(category), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  removeCategory(id: string) {
    return this.http.delete(`${this.url}/${id}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(id: string, category: Category): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/' + id, JSON.stringify(category), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }

}
