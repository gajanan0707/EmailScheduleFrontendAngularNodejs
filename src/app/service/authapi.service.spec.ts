import { TestBed } from '@angular/core/testing';

import { AuthapiService } from './authapi.service';

describe('AuthapiService', () => {
  let service: AuthapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
