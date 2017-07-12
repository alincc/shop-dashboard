import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchService {
  private limit: number = 10;

  constructor(private http: Http) { }

  search (term: string) {
    return this.http
      .get(`http://localhost:9000/api/product?query=${term}&limit=${this.limit}`)
      .map((response) => response.json());
  }
}
