import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencesPavillonAddComponent } from './residences-pavillon-add.component';

describe('ResidencesPavillonAddComponent', () => {
  let component: ResidencesPavillonAddComponent;
  let fixture: ComponentFixture<ResidencesPavillonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidencesPavillonAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidencesPavillonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
