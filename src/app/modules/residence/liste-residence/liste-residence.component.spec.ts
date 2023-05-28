import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeResidenceComponent } from './liste-residence.component';

describe('ListeResidenceComponent', () => {
  let component: ListeResidenceComponent;
  let fixture: ComponentFixture<ListeResidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeResidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
