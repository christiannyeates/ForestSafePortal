import { TestBed } from '@angular/core/testing';

import {   HttpErrorInterceptor } from './errorhandler.service';

describe('ErrorhandlerService', () => {
  let service: HttpErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpErrorInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
