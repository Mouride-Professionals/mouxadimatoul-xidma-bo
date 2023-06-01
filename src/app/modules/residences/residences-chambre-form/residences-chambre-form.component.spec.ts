import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesChambreFormComponent } from './residences-chambre-form.component';

describe('ResidencesChambreFormComponent', () => {
  let component: ResidencesChambreFormComponent;
  let fixture: ComponentFixture<ResidencesChambreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesChambreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesChambreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
