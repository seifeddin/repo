import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolefonctionnelComponent } from './rolefonctionnel.component';

describe('RolefonctionnelComponent', () => {
  let component: RolefonctionnelComponent;
  let fixture: ComponentFixture<RolefonctionnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolefonctionnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolefonctionnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
