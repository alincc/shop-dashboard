import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';

import { CustomRequestOptions } from './custom-request.options';
import { LoaderService } from './loader/loader.service';

@Injectable()
export class HttpService extends Http {

  apiUrl: string = 'http://localhost:9000/api/';

  constructor(
    backend: XHRBackend,
    defaultOptions: CustomRequestOptions,
    private loaderService: LoaderService,
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();

    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .delay(Math.floor(Math.random() * 1500) + 500) // TODO: remove line
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) =>  {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs) {
    this.showLoader();

    return super.post(this.getFullUrl(url), body, options)
      .delay(Math.floor(Math.random() * 1500) + 500) // TODO: remove line
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) =>  {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs) {
    this.showLoader();

    return super.put(this.getFullUrl(url), body, options)
      .delay(Math.floor(Math.random() * 1500) + 500) // TODO: remove line
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) =>  {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  delete(url: string, options?: RequestOptionsArgs) {
    this.showLoader();

    return super.post(this.getFullUrl(url), options)
      .delay(Math.floor(Math.random() * 1500) + 500) // TODO: remove line
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) =>  {
        this.onError(error);
      })
      .finally(() => {
        this.onEnd();
      });
  }

  private onSuccess(res: Response): void {

  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
  }

  private onEnd(): void {
    this.hideLoader();
  }

  private getFullUrl(url: string): string {
    return this.apiUrl + url;
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new CustomRequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    return options;
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

}
