import { TestBed } from '@angular/core/testing';

import { AdminstrationService } from './adminstration.service';

describe('AdminstrationService', () => {
  let service: AdminstrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminstrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
