import { TestBed } from '@angular/core/testing';

import { MotivopausaService } from './motivopausa.service';

describe('MotivopausaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotivopausaService = TestBed.get(MotivopausaService);
    expect(service).toBeTruthy();
  });
});
