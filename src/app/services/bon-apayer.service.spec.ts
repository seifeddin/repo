import { TestBed } from '@angular/core/testing';

import { BonAPayerService } from './bon-apayer.service';

describe('BonAPayerService', () => {
  let service: BonAPayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BonAPayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
