import { TestBed } from '@angular/core/testing';

import { FriesOrderService } from './fries-order.service';

describe('FriesOrderService', () => {
  let service: FriesOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriesOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
