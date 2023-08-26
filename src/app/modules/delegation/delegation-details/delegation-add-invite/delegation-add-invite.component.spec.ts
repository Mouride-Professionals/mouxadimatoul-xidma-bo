import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationAddInviteComponent } from './delegation-add-invite.component';

describe('DelegationAddInviteComponent', () => {
  let component: DelegationAddInviteComponent;
  let fixture: ComponentFixture<DelegationAddInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegationAddInviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegationAddInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
