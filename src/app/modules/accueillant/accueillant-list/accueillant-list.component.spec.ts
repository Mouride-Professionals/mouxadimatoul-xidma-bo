import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueillantListComponent } from './accueillant-list.component';

describe('AccueillantListComponent', () => {
  let component: AccueillantListComponent;
  let fixture: ComponentFixture<AccueillantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueillantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueillantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
