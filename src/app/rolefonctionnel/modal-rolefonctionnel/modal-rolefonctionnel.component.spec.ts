import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRolefonctionnelComponent } from './modal-rolefonctionnel.component';

describe('ModalRolefonctionnelComponent', () => {
  let component: ModalRolefonctionnelComponent;
  let fixture: ComponentFixture<ModalRolefonctionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRolefonctionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRolefonctionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
