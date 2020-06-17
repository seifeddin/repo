import { TestBed } from '@angular/core/testing';

import { ReglementListService } from './reglement-list.service';

describe('ReglementListService', () => {
  let service: ReglementListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
