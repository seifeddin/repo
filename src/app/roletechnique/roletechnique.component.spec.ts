import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletechniqueComponent } from './roletechnique.component';

describe('RoletechniqueComponent', () => {
  let component: RoletechniqueComponent;
  let fixture: ComponentFixture<RoletechniqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoletechniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
