import { TestBed } from '@angular/core/testing';

import { TotaldistanceService } from './totaldistance.service';

describe('TotaldistanceService', () => {
  let service: TotaldistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotaldistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
