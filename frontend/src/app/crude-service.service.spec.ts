import { TestBed } from '@angular/core/testing';

import { CrudeServiceService } from './crude-service.service';

describe('CrudeServiceService', () => {
  let service: CrudeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
