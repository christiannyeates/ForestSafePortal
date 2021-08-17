import { TestBed } from '@angular/core/testing';

import { ConvertToBSTService } from './convert-to-bst.service';

describe('ConvertToBSTService', () => {
  let service: ConvertToBSTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertToBSTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
