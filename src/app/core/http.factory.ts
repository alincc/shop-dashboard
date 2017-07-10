import { XHRBackend } from '@angular/http';
import { CustomRequestOptions } from './custom-request.options';
import { HttpService } from './http.service';
import { LoaderService } from './loader/loader.service';

function httpServiceFactory(backend: XHRBackend, options: CustomRequestOptions, loaderService: LoaderService) {
  return new HttpService(backend, options, loaderService);
}

export { httpServiceFactory };
