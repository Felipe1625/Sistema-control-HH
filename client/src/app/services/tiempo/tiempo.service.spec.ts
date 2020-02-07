import { TestBed } from '@angular/core/testing';

import { TiempoService } from './tiempo.service';

describe('TiempoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiempoService = TestBed.get(TiempoService);
    expect(service).toBeTruthy();
  });
});
