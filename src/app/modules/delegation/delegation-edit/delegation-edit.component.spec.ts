import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegationEditComponent } from './delegation-edit.component';

describe('DelegationEditComponent', () => {
  let component: DelegationEditComponent;
  let fixture: ComponentFixture<DelegationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
