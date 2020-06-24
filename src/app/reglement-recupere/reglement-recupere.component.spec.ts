import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementRecupereComponent } from './reglement-recupere.component';

describe('ReglementRecupereComponent', () => {
  let component: ReglementRecupereComponent;
  let fixture: ComponentFixture<ReglementRecupereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementRecupereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementRecupereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
