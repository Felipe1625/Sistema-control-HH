import { TestBed } from '@angular/core/testing';

import { PuestotrabajadorService } from './puestotrabajador.service';

describe('PuestotrabajadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuestotrabajadorService = TestBed.get(PuestotrabajadorService);
    expect(service).toBeTruthy();
  });
});
