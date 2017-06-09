import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }

}
