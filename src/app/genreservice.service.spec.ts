import { TestBed } from '@angular/core/testing';

import { GenreserviceService } from './genreservice.service';

describe('GenreserviceService', () => {
  let service: GenreserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
