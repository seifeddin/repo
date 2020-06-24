import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonAPayerComponent } from './bon-apayer.component';

describe('BonAPayerComponent', () => {
  let component: BonAPayerComponent;
  let fixture: ComponentFixture<BonAPayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonAPayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonAPayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
