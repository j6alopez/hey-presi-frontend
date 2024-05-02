import { TestBed } from '@angular/core/testing';

import { NeighborsService } from './neighbors.service';

describe('NeighborsService', () => {
  let service: NeighborsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeighborsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
