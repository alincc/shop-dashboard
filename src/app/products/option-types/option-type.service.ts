import { Injectable } from '@angular/core';
import { Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpService } from '../../core/http.service';
import { OptionType } from '../models/product';

@Injectable()
export class OptionTypeService {
  private url = 'option-type';

  constructor(private http: HttpService) { }

  getAll(): Observable<OptionType[]> {
    return this.http.get(this.url)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  get(id: String): Observable<OptionType> {
    return this.http.get(this.url + '/' + id)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  create(optionType: OptionType) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(optionType);

    return this.http.post(this.url, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(id: string, optionType: OptionType) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const body = JSON.stringify(optionType);

    return this.http.put(`${this.url}/${id}`, body, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  remove(id: string, soft: boolean = true) {
    return this.http.delete(`${this.url}/${id}?soft=${soft}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json() || 'Server error');
  }
}
