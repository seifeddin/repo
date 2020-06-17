import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUtilisateurComponent } from './modal-utilisateur.component';

describe('ModalUtilisateurComponent', () => {
  let component: ModalUtilisateurComponent;
  let fixture: ComponentFixture<ModalUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
