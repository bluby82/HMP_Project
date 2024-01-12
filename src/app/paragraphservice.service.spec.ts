import { TestBed } from '@angular/core/testing';

import { ParagraphserviceService } from './paragraphservice.service';

describe('ParagraphserviceService', () => {
  let service: ParagraphserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagraphserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
