import { TestBed } from '@angular/core/testing';

import { RegistationsService } from './registations.service';

describe('RegistationsService', () => {
  let service: RegistationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
