import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInviteComponent } from './form-invite.component';

describe('FormInviteComponent', () => {
  let component: FormInviteComponent;
  let fixture: ComponentFixture<FormInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
