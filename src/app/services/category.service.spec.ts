import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CategoryService } from './category.service';
import { fakeBackEndProvider } from '../../testing/fakeBackendFactory';

describe('CategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        CategoryService,
        fakeBackEndProvider,
      ]
    });
  });

  it('should be created', inject([CategoryService], (service: CategoryService) => {
    expect(service).toBeTruthy();
  }));
});
