import { TestBed } from '@angular/core/testing';

import { OperadorService } from './operador.service';

describe('OperadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperadorService = TestBed.get(OperadorService);
    expect(service).toBeTruthy();
  });
});
