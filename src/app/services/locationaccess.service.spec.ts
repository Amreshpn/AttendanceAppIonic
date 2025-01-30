import { TestBed } from '@angular/core/testing';

import { LocationaccessService } from './locationaccess.service';

describe('LocationaccessService', () => {
  let service: LocationaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
