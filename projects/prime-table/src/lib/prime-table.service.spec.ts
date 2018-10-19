import { TestBed } from '@angular/core/testing';

import { PrimeTableService } from './prime-table.service';

describe('PrimeTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrimeTableService = TestBed.get(PrimeTableService);
    expect(service).toBeTruthy();
  });
});
