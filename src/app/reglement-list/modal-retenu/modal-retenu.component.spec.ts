import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRetenuComponent } from './modal-retenu.component';

describe('ModalRetenuComponent', () => {
  let component: ModalRetenuComponent;
  let fixture: ComponentFixture<ModalRetenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRetenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRetenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
