import { TestBed } from '@angular/core/testing';

import { TrabajoService } from './trabajo.service';

describe('TrabajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabajoService = TestBed.get(TrabajoService);
    expect(service).toBeTruthy();
  });
});
