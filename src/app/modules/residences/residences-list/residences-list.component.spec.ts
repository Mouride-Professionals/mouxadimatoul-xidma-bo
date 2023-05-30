import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesListComponent } from './residences-list.component';

describe('ResidencesListComponent', () => {
  let component: ResidencesListComponent;
  let fixture: ComponentFixture<ResidencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
