import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAffiliationRoleComponent } from './modal-affiliation-role.component';

describe('ModalAffiliationRoleComponent', () => {
  let component: ModalAffiliationRoleComponent;
  let fixture: ComponentFixture<ModalAffiliationRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAffiliationRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAffiliationRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
