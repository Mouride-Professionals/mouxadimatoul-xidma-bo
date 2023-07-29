import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueillantFormComponent } from './accueillant-form.component';

describe('AccueillantFormComponent', () => {
  let component: AccueillantFormComponent;
  let fixture: ComponentFixture<AccueillantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueillantFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueillantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
