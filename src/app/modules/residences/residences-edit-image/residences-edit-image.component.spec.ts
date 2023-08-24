import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesEditImageComponent } from './residences-edit-image.component';

describe('ResidencesEditImageComponent', () => {
  let component: ResidencesEditImageComponent;
  let fixture: ComponentFixture<ResidencesEditImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesEditImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
