import { TestBed } from '@angular/core/testing';

import { AccueillantService } from './accueillant.service';

describe('AccueillantService', () => {
  let service: AccueillantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccueillantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
