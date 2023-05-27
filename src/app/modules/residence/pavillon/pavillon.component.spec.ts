import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PavillonComponent } from './pavillon.component';

describe('PavillonComponent', () => {
  let component: PavillonComponent;
  let fixture: ComponentFixture<PavillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PavillonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PavillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
