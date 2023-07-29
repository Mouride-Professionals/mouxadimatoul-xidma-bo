import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueillantComponent } from './accueillant.component';

describe('AccueillantComponent', () => {
  let component: AccueillantComponent;
  let fixture: ComponentFixture<AccueillantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueillantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueillantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
