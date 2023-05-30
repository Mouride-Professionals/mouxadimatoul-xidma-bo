import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesDetailsComponent } from './residences-details.component';

describe('ResidencesDetailsComponent', () => {
  let component: ResidencesDetailsComponent;
  let fixture: ComponentFixture<ResidencesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
