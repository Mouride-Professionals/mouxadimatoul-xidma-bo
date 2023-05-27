import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurFormeComponent } from './utilisateur-forme.component';

describe('UtilisateurFormeComponent', () => {
  let component: UtilisateurFormeComponent;
  let fixture: ComponentFixture<UtilisateurFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurFormeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
