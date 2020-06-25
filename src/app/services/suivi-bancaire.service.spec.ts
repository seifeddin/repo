import { TestBed } from '@angular/core/testing';

import { SuiviBancaireService } from './suivi-bancaire.service';

describe('SuiviBancaireService', () => {
  let service: SuiviBancaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviBancaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
