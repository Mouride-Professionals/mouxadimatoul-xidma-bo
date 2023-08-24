import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesEditComponent } from './residences-edit.component';

describe('ResidencesEditComponent', () => {
  let component: ResidencesEditComponent;
  let fixture: ComponentFixture<ResidencesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
