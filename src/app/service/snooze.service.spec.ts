import { TestBed } from '@angular/core/testing';

import { SnoozeService } from './snooze.service';

describe('SnoozeService', () => {
  let service: SnoozeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnoozeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
