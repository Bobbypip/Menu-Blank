import { TestBed } from '@angular/core/testing';

import { Send2whatsappService } from './send2whatsapp.service';

describe('Send2whatsappService', () => {
  let service: Send2whatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Send2whatsappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
