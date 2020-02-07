import { TestBed } from '@angular/core/testing';

import { OtService } from './ot.service';

describe('OtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtService = TestBed.get(OtService);
    expect(service).toBeTruthy();
  });
});
