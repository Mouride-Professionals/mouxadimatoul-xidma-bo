import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesFormComponent } from './residences-form.component';

describe('ResidencesFormComponent', () => {
  let component: ResidencesFormComponent;
  let fixture: ComponentFixture<ResidencesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
