import { TestBed } from '@angular/core/testing';

import { PausaService } from './pausa.service';

describe('PausaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PausaService = TestBed.get(PausaService);
    expect(service).toBeTruthy();
  });
});
