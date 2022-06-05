import { TestBed } from '@angular/core/testing';

import { MJsExternosService } from './m-js-externos.service';

describe('MJsExternosService', () => {
  let service: MJsExternosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MJsExternosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
