import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProductService } from './product.service';
import { fakeBackEndProvider } from '../../testing/fakeBackendFactory';

describe('ProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        MockBackend,
        BaseRequestOptions,
        fakeBackEndProvider,
      ]
    });
  });

  it('should be created', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
