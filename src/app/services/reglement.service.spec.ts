import { TestBed } from '@angular/core/testing';

import { ReglementService } from './reglement.service';

describe('ReglementService', () => {
  let service: ReglementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
