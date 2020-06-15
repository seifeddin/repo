import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglementListComponent } from './reglement-list.component';

describe('ReglementListComponent', () => {
  let component: ReglementListComponent;
  let fixture: ComponentFixture<ReglementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
