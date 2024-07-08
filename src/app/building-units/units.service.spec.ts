import { TestBed } from '@angular/core/testing';

import { BuildingUnitsService } from './building-units.service';

describe('UnitsService', () => {
  let service: BuildingUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
