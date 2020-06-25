import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviBancaireComponent } from './suivi-bancaire.component';

describe('SuiviBancaireComponent', () => {
  let component: SuiviBancaireComponent;
  let fixture: ComponentFixture<SuiviBancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviBancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
