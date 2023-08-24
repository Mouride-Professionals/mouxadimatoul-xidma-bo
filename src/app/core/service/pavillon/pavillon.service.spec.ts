import { TestBed } from '@angular/core/testing';

import { PavillonService } from './pavillon.service';

describe('PavillonService', () => {
  let service: PavillonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PavillonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
